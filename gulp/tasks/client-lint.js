var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    lodash = require('lodash'),
    config = require('../config');


/**
 * Lint the stylesheet using SASS-LINT
 */
gulp.task('client:lint:stylesheet', function () {
    // Nothing happening here right now
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
gulp.task('client:lint', [
    'client:lint:stylesheet',
    'client:lint:javascript'
]);
