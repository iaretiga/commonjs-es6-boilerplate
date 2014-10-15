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
    gulp.src(config.sourceRoot + '/**/*.js')
        .pipe(jshint({ esnext: true }))
        .pipe(jshint.reporter(jshintStylish));
});

gulp.task('build-js', ['jshint'], function() {
    gulp.src(config.sourceRoot + '/' + config.mainScript)
        .pipe(browserify({
            transform: [
                [ { visitors: jstransformVisitors }, 'jstransformify' ]
            ]
        }))
        .pipe(gulp.dest(config.buildRoot));
});

gulp.task('build-html', function() {
    gulp.src(config.sourceRoot + '/index.html')
        .pipe(gulp.dest(config.buildRoot));
});

gulp.task('build', ['build-js', 'build-html'], function() {});

gulp.task('watch', function(done) {

    gulp.watch([config.sourceRoot + '/**/*.js'], ['build']);
    gulp.watch([config.sourceRoot + '/index.html'], ['build-html']);

});

gulp.task('test', function(done) {
    var jestConfig = {
        rootDir: config.sourceRoot,
        scriptPreprocessor: '../tools/jest-preprocessor.js',
    };

    jest.runCLI({ config : jestConfig }, ".", function() {
        done();
    });
});

gulp.task('tdd', function(done) {
    gulp.watch([ config.sourceRoot + "/**/*.js" ], [ 'test' ]);
});

gulp.task('webserver', function() {
    gulp.src(config.buildRoot)
        .pipe(webserver({
            livereload: true
        }));
});

gulp.task('default', function() {
    // place code for your default task here
});
