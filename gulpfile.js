var gulp = require("gulp");
var browserify = require('gulp-browserify');
var webserver = require('gulp-webserver');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
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
        .pipe(jshint.reporter(jshintStylish));
});

gulp.task('build-js', ['jshint'], function() {
    gulp.src(rootDir + '/app.js')
        .pipe(browserify({
            transform: [
                [ { visitors: jstransformVisitors }, 'jstransformify' ]
            ]
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('build-html', function() {
    gulp.src(rootDir + '/index.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('build', ['build-js', 'build-html'], function() {});

gulp.task('watch', function(done) {

    gulp.watch([rootDir + '/**/*.js'], ['build']);
    gulp.watch([rootDir + '/index.html'], ['build-html']);

});

gulp.task('test', function(done) {
    jest.runCLI({ config : jestConfig }, ".", function() {
        done();
    });
});

gulp.task('tdd', function(done) {
    gulp.watch([ jestConfig.rootDir + "/**/*.js" ], [ 'test' ]);
});

gulp.task('webserver', function() {
    gulp.src('build')
        .pipe(webserver({
            livereload: true,
            directoryListing: true
        }));
});

gulp.task('default', function() {
    // place code for your default task here
});
