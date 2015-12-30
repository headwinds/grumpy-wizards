var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    process = require('process'),
    config = require('../config');

gulp.task('server:test', [ 'server:lint' ], function () {
    return gulp.src(config.test.server)
        .pipe(mocha(config.options.mocha))
        .once('error', function () { process.exit(1); });
});
