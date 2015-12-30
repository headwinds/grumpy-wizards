var gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    config = require('../config');

/**
 * Copy all the static files from the client area to the public area
 */
gulp.task('client:build:copyfiles', function () {
    gulp.src(config.source.client.files.copy)
        .pipe(gulp.dest(config.destination.directory));
});

/**
 * Transpile and combine all the JavaScript files into a single library
 */
gulp.task('client:build:javascript', [ 'client:test' ], function () {
    return browserify({ debug: true })
        .add(config.source.client.entry.javascript, { entry: true })
        .transform(babelify, { presets: [ 'es2015', 'react' ], sourceMaps: true })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.destination.directory));
});

/**
 * Build the CSS Stylesheet from SCSS Files
 */
gulp.task('client:build:stylesheet', [ 'client:lint:stylesheet' ], function () {
    // Nothing happening here right now
});

/**
 * Composite task for building the public area
 */
gulp.task('client:build', [
    'client:build:copyfiles',
    'client:build:javascript',
    'client:build:stylesheet'
]);