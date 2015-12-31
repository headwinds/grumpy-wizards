var gulp = require('gulp'),
    requireAll = require('require-dir');

require('babel-register');
requireAll('./gulp/tasks');

gulp.task('default', [ 'build' ]);

gulp.task('build', [
    'client:build',
    'server:build'
]);
