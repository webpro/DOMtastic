var path = require('path'),
    fs = require('fs'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    es6ify = require('es6ify'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    size = require('gulp-size'),
    traceur = require('gulp-traceur'),
    footer = require('gulp-footer'),
    Orchestrator = require('orchestrator'),
    source = require('vinyl-source-stream'),
    map = require('through2-map'),
    es = require('event-stream'),
    pkg = require('./package.json');

// Configuration

var srcDir = path.resolve('src'),
    srcFiles = srcDir + '**/*.js',
    fileName = 'domtastic.js',
    fileNameMin = 'domtastic.min.js',
    fileNameMap = fileNameMin + '.map',
    distFolder = 'dist/',
    releaseFolder = '.release/',
    uglifyOptions = {
        mangle: true,
        preserveComments: false,
        compress: true,
        'screw-ie8': true,
        outSourceMap: true
    };

var bundlePresets = {
    full: {
        modulesToExclude: [],
        dest: path.resolve(releaseFolder, 'bundle', 'full')
    },
    default: {
        modulesToExclude: ['css', 'data', 'dom_extra', 'mode', 'selector_extra', 'type'],
        dest: path.resolve(releaseFolder, 'bundle', 'default')
    },
    bare: {
        modulesToExclude: ['attr', 'css', 'data', 'dom_extra', 'html', 'mode', 'noconflict', 'selector_extra', 'type'],
        dest: path.resolve(releaseFolder, 'bundle', 'bare')
    },
    custom: {
        modulesToExclude: gutil.env.exclude ? gutil.env.exclude.split(',') : gutil.env.include ? getModulesToExclude(gutil.env.include) : [],
        dest: distFolder
    }
};

// Task grouping

gulp.task('default', ['build']);

gulp.task('build', ['uglify-dist']);

gulp.task('build-release', ['uglify', 'transpile-cjs', 'transpile-amd']);

// Simple tasks

gulp.task('clean', function() {
    return gulp.src([distFolder, releaseFolder], {
        read: false
    }).pipe(clean());
});

gulp.task('watch', function() {
    return gulp.watch(srcFiles, ['bundle']);
});

// Transpile ES6 Modules to CommonJS/AMD

gulp.task('transpile-cjs', ['clean'], function() {
    return gulp.src('**/*.js', {
            cwd: srcDir
        })
        .pipe(traceur())
        .pipe(replace(/__VERSION__/, pkg.version))
        .pipe(gulp.dest(releaseFolder + 'commonjs'));

});

gulp.task('transpile-amd', ['clean'], function() {
    return gulp.src('**/*.js', {
            cwd: srcDir
        })
        .pipe(traceur({
            modules: 'amd'
        }))
        .pipe(replace(/__VERSION__/, pkg.version))
        .pipe(gulp.dest(releaseFolder + 'amd'));

});

gulp.task('bundle', ['clean'], function() {

    function bundle(preset) {

        var b = browserify()
            .require(srcDir, {
                entry: true
            })
            .transform(es6ify);

        bundlePresets[preset].modulesToExclude.map(resolveModulePath).map(b.exclude.bind(b));

        return b
            .bundle({
                standalone: 'domtastic'
            })
            .pipe(modify([version, exportDefault, dollar, unget]))
            .pipe(modify(exclude(preset))).pipe(source(fileName)).pipe(gulp.dest(bundlePresets[preset].dest));
    }

    return es.concat(
        bundle('custom'),
        bundle('full'),
        bundle('default'),
        bundle('bare')
    )

});

gulp.task('uglify-dist', ['bundle'], function(done) {
    return _uglify({
        srcPath: path.resolve(bundlePresets['custom'].dest, fileName)
    }, done);
});

gulp.task('uglify', ['bundle'], function(done) {
    var orchestrator = new Orchestrator();
    for (var preset in bundlePresets) {
        orchestrator.add(preset, _uglify.bind(null, {
            srcPath: path.resolve(bundlePresets[preset].dest, fileName),
            title: preset
        }));
    }
    orchestrator.start.call(orchestrator, Object.keys(bundlePresets), done);
});

// Util

function getModulesToExclude(modulesToIncludeArg) {
    var modulesToInclude = ['index', 'api', 'util'].concat(modulesToIncludeArg.split(',')),
        modulesList = fs.readdirSync('./src').map(function (module) {
            return module.replace('.js', '');
        });
    return modulesList.filter(function (module) {
        return modulesToInclude.indexOf(module) === -1;
    });
}

function _uglify(options, done) {

    var orchestrator = new Orchestrator(),
        dir = path.dirname(options.srcPath);

    orchestrator.add('uglify', function() {
        return gulp
            .src(options.srcPath, {
                cwd: dir
            })
            .pipe(rename(function(path) {
                path.extname = '.min.js';
            }))
            .pipe(uglify(uglifyOptions))
            .pipe(gulp.dest(dir))
    });

    orchestrator.add('showSize', ['uglify'], function() {
        return gulp.src(path.resolve(dir, fileNameMin))
            .pipe(size({
                title: options.title || '',
                gzip: true,
                showFiles: true
            }));
    });

    orchestrator.add('fixSourceMapSources', ['uglify'], function() {
        return gulp.src(path.resolve(dir, fileNameMap))
            .pipe(replace('"file":"' + fileNameMap + '"', '"file":"' + fileNameMin + '"'))
            .pipe(replace('"sources":["' + fileNameMin + '"]', '"sources":["' + fileName + '"]'))
            .pipe(gulp.dest(dir));
    });

    orchestrator.start('showSize', 'fixSourceMapSources', done);

}

function resolveModulePath(moduleName) {
    return './' + moduleName;
}

// Text-based modifiers

function version(data) {
    return data.replace(/__VERSION__/, pkg.version);
}

function exportDefault(data) {
    return data.replace(/^(!function\()([a-z])(\)\{)/, '$1_$2$3var $2=function(){return _$2()["default"]};')
}

function dollar(data) {
    return data.replace(/domtastic/, '$');
}

function exclude(preset) {
    var modulesToExclude = bundlePresets[preset].modulesToExclude,
        removeDeReqsRE = new RegExp('.+_dereq_.+(__M__).+\\n'.replace(/__M__/g, modulesToExclude.join('|')), 'g'),
        removeExtendsRE = new RegExp('(,\\ (__M__)\\b)'.replace(/__M__/g, modulesToExclude.join('_?|')), 'g');
    return function(data) {
        return modulesToExclude.length ? data.replace(removeDeReqsRE, '').replace(removeExtendsRE, '') : data;
    }
}

function unget(data) {
    return data.replace(/get\ (.*)\(\)\ {\n\s+return\ (.*);\n\s+}/g, '$1: $2')
}

function modify(modifiers) {
    return map({
        wantStrings: true
    }, function(data) {
        (typeof modifiers === 'function' ? [modifiers] : modifiers).forEach(function(modifier) {
            data = modifier(data);
        });
        return data;
    })
}
