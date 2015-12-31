var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    lodash = require('lodash'),
    runSequence = require('run-sequence'),
    sassLint = require('gulp-sass-lint'),
    config = require('../config');


/**
 * Lint the stylesheet using SASS-LINT
 */
gulp.task('client:lint:stylesheet', function () {
    return gulp.src(config.source.client.files.stylesheet)
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

/**
 * Lint the JavaScript contents using ESLINT
 */
gulp.task('client:lint:javascript', function () {
    return gulp.src(lodash.union(config.source.client.files.javascript, config.test.client))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

/**
 * Composite task for linting the entire client set
 */
gulp.task('client:lint', function (callback) {
    runSequence('client:lint:stylesheet', 'client:lint:javascript', callback);
});
