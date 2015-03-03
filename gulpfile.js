var gulp = require("gulp");
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var babelify = require('babelify');
var webserver = require('gulp-webserver');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var jest = require('jest-cli');
var less = require('gulp-less');

var config = {
    // directory containing your source files
    sourceRoot: 'source',

    // output directory / webserver root
    buildRoot: 'build',

    // main script file, within sourceRoot
    mainScript: 'app.js'
};

gulp.task('jshint', function() {
    console.log('Running JsHint on javascript source files.');
    gulp.src(config.sourceRoot + '/**/*.js')
        .pipe(jshint({ esnext: true }))
        .pipe(jshint.reporter(jshintStylish));
});

gulp.task('build-js', ['jshint'], function() {
    console.log('Building ' + config.mainScript + '.');
    gulp.src(config.sourceRoot + '/' + config.mainScript)
        .pipe(browserify({
            /* PENDING: deprecated */
            debug: !gulp.env.production,
            transform: babelify
        }))
        .on('error', function(err) {
            console.error('=== BROWSERIFY BUILD FAILED ===');
            console.error(err.message);
            console.error('===============================');
        })
        .pipe(gulp.dest(config.buildRoot));
});

gulp.task('build-less', function () {
    console.log('Building CSS from main less files found at ' + config.sourceRoot + '.');
    gulp.src(config.sourceRoot + '/*.less')
        .pipe(less())
        .on('error', function(err) {
            console.error('=== LESS COMPILATION FAILED ===');
            console.error(err.message);
            console.error('===============================');
        })
        .pipe(gulp.dest(config.buildRoot));
});

gulp.task('build-html', function() {
    console.log('Copying index.html to build folder.');
    gulp.src(config.sourceRoot + '/index.html')
        .pipe(gulp.dest(config.buildRoot));
});

gulp.task('build', ['build-js', 'build-less', 'build-html'], function() {});

gulp.task('watch', function(done) {
    console.log('Watching **/*.js, **/*.less and index.html files, rebuilding them on change.');
    gulp.watch([config.sourceRoot + '/**/*.js'], ['build-js']);
    gulp.watch([config.sourceRoot + '/**/*.less'], ['build-less']);
    gulp.watch([config.sourceRoot + '/index.html'], ['build-html']);
});

gulp.task('test', function(done) {
    console.log('Running unit tests.');
    var jestConfig = {
        rootDir: config.sourceRoot,
        scriptPreprocessor: '../node_modules/babel-jest',
    };

    jest.runCLI({ config : jestConfig }, ".", function() {
        done();
    });
});

gulp.task('tdd', function(done) {
    console.log('Watching js source and test files, running unit tests on change.');
    gulp.watch([ config.sourceRoot + "/**/*.js" ], [ 'test' ]);
});

gulp.task('webserver', function() {
    console.log('Starting webserver. Serving built application with live reload.');
    gulp.src(config.buildRoot)
        .pipe(webserver({
            livereload: true
        }));
});

gulp.task('default', ['build'], function() {});
