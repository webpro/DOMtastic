var gulp = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    es6ModuleTranspiler = require('gulp-es6-module-transpiler'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    replace = require('gulp-replace'),
    size = require('gulp-size'),
    gzip = require("gulp-gzip"),
    jscs = require('gulp-jscs'),
    lazypipe = require('lazypipe'),
    es = require('event-stream');

// Configuration

var srcFiles = './src/**/*.js',
    fileName = 'jquery-evergreen.js',
    browserifyEntryPoint = './.release/commonjs/main.js',
    distFolder = 'dist/',
    releaseFolder = '.release/';

var bundlePresets = {
    default: {
        modulesToExclude: ['dom_extra', 'mode', 'selector_extra'],
        dest: releaseFolder
    },
    full: {
        modulesToExclude: [],
        dest: releaseFolder + 'bundle/full'
    },
    bare: {
        modulesToExclude: ['attr', 'dom_extra', 'html', 'mode', 'selector_extra'],
        dest: releaseFolder + 'bundle/bare'
    },
    custom: {
        modulesToExclude: gutil.env.exclude ? gutil.env.exclude.split(',') : [],
        dest: distFolder
    }
};

// Task grouping

gulp.task('default', ['build', 'jscs']);

gulp.task('build', ['uglify']);

gulp.task('build-release', ['uglify-bundles', 'transpile-amd']);

// Simple tasks

gulp.task('clean', function() {
    return gulp.src(releaseFolder, {read: false}).pipe(clean());
});

gulp.task('watch', function () {
    return gulp.watch(srcFiles, ['build']);
});

// Transpile ES6 Modules to CommonJS/AMD

gulp.task('transpile-cjs', ['clean'], function() {
    return gulp.src(srcFiles).pipe(es6ModuleTranspiler({type: 'cjs'})).pipe(gulp.dest(releaseFolder + 'commonjs'));
});

gulp.task('transpile-amd', ['clean'], function() {
    return gulp.src(srcFiles).pipe(es6ModuleTranspiler({type: 'amd', anonymous: true})).pipe(gulp.dest(releaseFolder + 'amd'));
});

// JSCS (QA/lint)

gulp.task('jscs', ['transpile-cjs'], function() {
    return gulp.src([releaseFolder + 'commonjs/**/*.js', '!' + releaseFolder + 'commonjs/je/api.js']).pipe(jscs());
});

// Browserify

gulp.task('browserify', ['transpile-cjs'], function() {
    var excludes = bundlePresets['custom'].modulesToExclude;
    return gulp.src(browserifyEntryPoint, { read: false })
        .pipe(browserify({standalone: 'jQueryEvergreen'}))
        .on('prebundle', excludify(excludes))
        .pipe(modify(excludes))
        .pipe(gulp.dest(bundlePresets['custom'].dest));
});

gulp.task('browserify-bundles', ['transpile-cjs'], function() {
    var stream = gulp.src(browserifyEntryPoint, { read: false }),
        browserifyOptions = {standalone: 'jQueryEvergreen'},
        excludeDef = bundlePresets['default'].modulesToExclude,
        excludeFull = bundlePresets['full'].modulesToExclude,
        excludeBare = bundlePresets['bare'].modulesToExclude;
    return es.concat(
        stream.pipe(browserify(browserifyOptions)).on('prebundle', excludify(excludeDef)).pipe(modify(excludeDef)).pipe(gulp.dest(bundlePresets['default'].dest)),
        stream.pipe(browserify(browserifyOptions)).on('prebundle', excludify(excludeFull)).pipe(modify(excludeFull)).pipe(gulp.dest(bundlePresets['full'].dest)),
        stream.pipe(browserify(browserifyOptions)).on('prebundle', excludify(excludeBare)).pipe(modify(excludeBare)).pipe(gulp.dest(bundlePresets['bare'].dest))
    )
});

// Uglify

gulp.task('uglify', ['browserify'], function() {
    return gulp.src([distFolder + '*.js', '!' + distFolder + '**/*.min.js'], {base: distFolder})
        .pipe(uglifyTasks())
        .pipe(gulp.dest(distFolder));
});

gulp.task('uglify-bundles', ['browserify-bundles'], function() {
    return gulp.src([releaseFolder + '*.js', releaseFolder + 'bundle/**/*.js', '!' + releaseFolder + '**/*.min.js'], {base: releaseFolder})
        .pipe(uglifyTasks())
        .pipe(gulp.dest(releaseFolder)
        .pipe(gzip()))
        .pipe(size({showFiles: true}));
});

var uglifyTasks = lazypipe()
    .pipe(uglify, {
        mangle: true,
        preserveComments: false,
        compress: true
    })
    .pipe(rename, function(dir, base, ext) {
        return base + '.min' + ext;
    });

// Utility functions

function mapModuleId(moduleName) {
    return './' + moduleName;
}

function excludify(modules) {
    return function(bundle) {
        return modules.map(mapModuleId).map(bundle.exclude.bind(bundle));
    }
}

function modify(modulesToExclude) {
    var pipe = lazypipe()
        .pipe(replace, /(jQueryEvergreen)=([^\(]\(\))/, '$=$2["default"]')
        .pipe(replace, /define\(([^\)])\)/, 'define(function(){return $1()["default"];})')
        .pipe(replace, getModuleBuilders(modulesToExclude), '')
        .pipe(replace, getModuleExtenders(modulesToExclude), '')
        .pipe(rename, fileName);
    return pipe();
}

function getModuleBuilders(modulesToExclude) {
    return modulesToExclude.length
        ? new RegExp('.+__es6_transpiler_build_module_object__.+(__M__).+\\n'.replace(/__M__/g, modulesToExclude.join('|')), 'g')
        : new RegExp()
}

function getModuleExtenders(modulesToExclude) {
    return modulesToExclude.length
        ? new RegExp('(,\\ (__M__))'.replace(/__M__/g, modulesToExclude.join('|')), 'g')
        : new RegExp()
}
