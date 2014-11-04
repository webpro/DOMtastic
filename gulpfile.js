var browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    del = require('del'),
    es = require('event-stream'),
    es6ify = require('es6ify'),
    gulp = require('gulp'),
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
    }
};

// Task grouping

gulp.task('default', ['build']);

gulp.task('build', ['uglify-dist']);

gulp.task('build-release', ['uglify', 'transpile-cjs', 'transpile-amd']);

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

function _browserify(entry, dest) {

    var bundler = browserify(entry, {
            standalone: 'domtastic',
            debug: true
        })
        .transform(es6ify)
        .bundle()
        .pipe(modify([versionify, exposify, dollarify, ungetify]))
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

function ungetify(data) {
    return data
        .replace(/Object\.defineProperties\(exports,\ ([\s\S]*(?=__esModule).+\n\})\);/, 'module.exports = $1;')
        .replace(/\{get:.+\n.+return\ (.+);\n[^,]+/g, '$1')
        .replace(/\{value:\ (.+)(?=\})\}/g, '$1')
        .replace(/(module\.exports[\s\S]*(?=__esModule).+\n\};)([\s\S]*)(?=\/\/#\ sourceMappingURL)/, '$2$1\n');
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
