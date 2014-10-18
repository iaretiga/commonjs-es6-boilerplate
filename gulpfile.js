var gulp = require("gulp");
var browserify = require('gulp-browserify');
var webserver = require('gulp-webserver');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var gutil = require('gulp-util');
var gulp = require('gulp');
var jest = require('jest-cli');
var jstransformVisitors = require('./tools/jstransformVisitors');

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
            debug: !gulp.env.production,
            transform: [
                [ { visitors: jstransformVisitors }, 'jstransformify' ]
            ]
        }))
        .pipe(gulp.dest(config.buildRoot));
});

gulp.task('build-html', function() {
    console.log('Copying index.html to build folder.');
    gulp.src(config.sourceRoot + '/index.html')
        .pipe(gulp.dest(config.buildRoot));
});

gulp.task('build', ['build-js', 'build-html'], function() {});

gulp.task('watch', function(done) {
    console.log('Watching js and html files, rebuilding them on change.');
    gulp.watch([config.sourceRoot + '/**/*.js'], ['build']);
    gulp.watch([config.sourceRoot + '/index.html'], ['build-html']);

});

gulp.task('test', function(done) {
    console.log('Running unit tests.');
    var jestConfig = {
        rootDir: config.sourceRoot,
        scriptPreprocessor: '../tools/jest-preprocessor.js',
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
