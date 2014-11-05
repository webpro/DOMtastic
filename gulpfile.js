var browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    del = require('del'),
    es = require('event-stream'),
    es6ify = require('es6ify'),
    fs = require('fs'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    map = require('through2-map'),
    path = require('path'),
    pkg = require('./package.json'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    size = require('gulp-size'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    traceur = require('gulp-traceur'),
    uglify = require('gulp-uglify');

// Configuration

var srcDir = path.resolve('src'),
    srcFiles = srcDir + '**/*.js',
    fileName = 'domtastic.js',
    distFolder = 'dist/',
    releaseFolder = '.release/',
    uglifyOptions = {
        mangle: true,
        preserveComments: false,
        compress: true,
        'screw-ie8': true
    };

var bundlePresets = {
    full: {
        entry: path.resolve(srcDir, 'index.full'),
        dest: path.resolve(releaseFolder, 'bundle', 'full')
    },
    default: {
        entry: path.resolve(srcDir, 'index'),
        dest: path.resolve(releaseFolder, 'bundle', 'default')
    },
    bare: {
        entry: path.resolve(srcDir, 'index.bare'),
        dest: path.resolve(releaseFolder, 'bundle', 'bare')
    },
    custom: {
        entry: path.resolve(srcDir, 'index.full'),
        modulesToExclude: gutil.env.exclude ? gutil.env.exclude.split(',') : gutil.env.include ? getModulesToExclude(gutil.env.include) : [],
        dest: distFolder
    }
};

// Task grouping

gulp.task('default', ['build']);

gulp.task('build', ['bundle']);

gulp.task('build-release', ['size', 'transpile-cjs', 'transpile-amd']);

// Simple tasks

gulp.task('clean', function(done) {
    del([distFolder, releaseFolder], done);
});

gulp.task('watch', ['bundle'], function() {
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
    return _browserify(bundlePresets['full'].entry, distFolder)
});

gulp.task('bundle-custom', ['clean'], function() {
    return _browserify(bundlePresets['custom'].entry, distFolder, bundlePresets['custom'].modulesToExclude)
});

gulp.task('bundle-all', ['clean'], function() {
    return es.merge.apply(es, ['full', 'default', 'bare'].map(function(preset) {
        return _browserify(bundlePresets[preset].entry,  bundlePresets[preset].dest);
    }));
});

gulp.task('size', ['bundle-all'], function() {
    return gulp
        .src(releaseFolder + '/**/*.min.js')
        .pipe(size({
            gzip: true,
            showFiles: true
        }))
});

function _browserify(entry, dest, excludes) {

    excludes = excludes || [];

    var bundler = browserify(entry, {
            standalone: 'domtastic',
            debug: true
        })
        .transform(es6ify);

    excludes.map(resolveModulePath).map(bundler.exclude.bind(bundler));

    bundler = bundler
        .bundle()
        .pipe(modify([versionify, exposify, dollarify, excludes.length ? exclude : noop]))
        .pipe(source(fileName))
        .pipe(gulp.dest(dest));

    var minifiedBundler = bundler
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify(uglifyOptions))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dest));

    return es.concat(bundler, minifiedBundler);
}

function resolveModulePath(moduleName) {
    return './' + moduleName;
}

function getModulesToExclude(modulesToIncludeArg) {
    var modulesToInclude = ['index.full', 'util'].concat(modulesToIncludeArg.split(',')),
        modulesList = fs.readdirSync('./src').map(function (module) {
            return module.replace('.js', '');
        });
    return modulesList.filter(function (module) {
        return modulesToInclude.indexOf(module) === -1;
    });
}

// Text-based source modifiers

function versionify(data) {
    return data.replace(/__VERSION__/, pkg.version);
}

function exposify(data) {
    return data.replace(/^(!function\()([a-z])(\)\{)/, '$1_$2$3var $2=function(){return _$2()["default"]};')
}

function dollarify(data) {
    return data.replace(/domtastic(?=\=)/, '$');
}

function exclude(data) {
    var modulesToExclude = bundlePresets['custom'].modulesToExclude,
        removeDeReqsRE = new RegExp('.+require.+(__M__).+\\n'.replace(/__M__/g, modulesToExclude.join('|')), 'g'),
        removeExtendsRE = new RegExp('(,\\ (__M__)\\b)'.replace(/__M__/g, modulesToExclude.join('_?|')), 'g');
    return modulesToExclude.length ? data.replace(removeDeReqsRE, '').replace(removeExtendsRE, '') : data;
}

function noop(data) {
    return data;
}

function modify(modifiers) {
    return map({
        wantStrings: true
    }, function(data) {
        if(data.indexOf('sourceMappingURL=data:application/json;base64,') !== -1) {
            return data;
        }
        (typeof modifiers === 'function' ? [modifiers] : modifiers).forEach(function(modifier) {
            data = modifier(data);
        });
        return data;
    })
}
