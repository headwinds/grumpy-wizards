var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    process = require('process'),
    config = require('../config');

gulp.task('client:test', [ 'client:lint:javascript' ], function () {
    return gulp.src(config.test.client)
        .pipe(mocha(config.options.mocha))
        .once('error', function () { process.exit(1); });
});