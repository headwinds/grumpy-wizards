var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    lodash = require('lodash'),
    config = require('../config');

gulp.task('server:lint', function () {
    return gulp.src(lodash.union(config.source.server, config.test.server))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
