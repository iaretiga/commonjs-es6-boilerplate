var gulp = require("gulp");
var browserify = require('gulp-browserify');
var gutil = require('gulp-util');
var gulp = require('gulp');
var jest = require('jest-cli');

var rootDir = 'source';

var jestConfig = {
    rootDir: rootDir,
    scriptPreprocessor: '../jest-preprocessor.js',
};

gulp.task('build', function() {
    gulp.src(rootDir + '/app.js')
        .pipe(browserify({
            transform: [[
                {
                    visitors: [
                        'jstransform/visitors/es6-arrow-function-visitors',
                        'jstransform/visitors/es6-class-visitors',
                        'jstransform/visitors/es6-object-short-notation-visitors',
                        'jstransform/visitors/es6-rest-param-visitors',
                        'jstransform/visitors/es6-template-visitors'
                    ]
                },
                'jstransformify'
            ]]
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
