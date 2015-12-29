var gulp = require('gulp'),
    requireAll = require('require-dir');

require('babel-register');
requireAll('./gulp/tasks');

gulp.task('default', [ 'test', 'build' ]);

gulp.task('build', [ 'server:build' ]);
gulp.task('test', [ 'server:test' ]);
