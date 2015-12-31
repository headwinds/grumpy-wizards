var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    browserifyshim = require('browserify-shim'),
    buffer = require('vinyl-buffer'),
    minifyCss = require('gulp-minify-css'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
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
gulp.task('client:build:javascript', function () {
    var options = {
        extensions: [ '.js', '.jsx' ],
        transforms: [
            babelify.configure({ presets: [ 'es2015', 'react' ]}),
            browserifyshim()
        ],
        debug: true
    };

    return browserify(config.source.client.entry.javascript, options).bundle()
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
gulp.task('client:build:stylesheet', function () {
    return gulp.src(config.source.client.entry.stylesheet)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(config.options.autoprefixer))
        .pipe(minifyCss(config.options.minifycss))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.destination.directory));
});

/**
 * Composite task for building the public area
 */
gulp.task('client:build', function (callback) {
    runSequence(
        'client:build:copyfiles',
        'client:build:javascript',
        'client:build:stylesheet',
        callback);
});