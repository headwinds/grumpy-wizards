var gulp = require('gulp'),
    requireAll = require('require-dir');

require('babel-register');
requireAll('./gulp/tasks');

gulp.task('default', [ 'test', 'build' ]);

gulp.task('build', [
    'client:build',
    'server:build'
]);

gulp.task('test', [
    'client:test',
    'server:test'
]);

gulp.task('lint', [
    'client:lint',
    'server:lint'
]);
