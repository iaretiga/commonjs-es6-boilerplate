var gulp = require("gulp");
var browserify = require('gulp-browserify');
var jshint = require('gulp-jshint');
var gutil = require('gulp-util');
var gulp = require('gulp');
var jest = require('jest-cli');
var jstransformVisitors = require('./tools/jstransformVisitors');

var rootDir = 'source';

var jestConfig = {
    rootDir: rootDir,
    scriptPreprocessor: '../tools/jest-preprocessor.js',
};

gulp.task('jshint', function() {
    gulp.src(rootDir + '/**/*.js')
        .pipe(jshint({ esnext: true }))
        .pipe(jshint.reporter('default'));
});

gulp.task('build', ['jshint'], function() {
    gulp.src(rootDir + '/app.js')
        .pipe(browserify({
            transform: [
                [ { visitors: jstransformVisitors }, 'jstransformify' ]
            ]
        }))
        .pipe(gulp.dest('./build'))
});

gulp.task('test', function(done) {
    jest.runCLI({ config : jestConfig }, ".", function() {
        done();
    });
});

gulp.task('tdd', function(done) {
    gulp.watch([ jestConfig.rootDir + "/**/*.js" ], [ 'test' ]);
});

gulp.task('default', function() {
    // place code for your default task here
});
