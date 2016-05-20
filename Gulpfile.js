/// <binding BeforeBuild='build' />
var eslint = require('gulp-eslint'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js');

var files = {
    client: [ 'client/**/*.js', 'client/**/*.jsx' ],
    server: [ 'server/**/*.js' ],
    libraries: [
        './node_modules/font-awesome/@(css|fonts)/*',
        './node_modules/mdi/@(css|fonts)/*',
        './node_modules/core-js/client/*'
    ]
};
var destination = './public';

gulp.task('build', [
    'server:lint',
    'libraries:copy',
    'webpack:build'
]);

gulp.task('lint', [
    'server:lint',
    'webpack:lint'
]);

gulp.task('server:lint', function () {
    return gulp.src(files.server)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('libraries:copy', function () {
    return gulp.src(files.libraries, { base: './node_modules' })
        .pipe(gulp.dest(destination));
});

gulp.task('webpack:lint', function () {
    return gulp.src(files.client)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('webpack:build', [ 'webpack:lint' ], function (callback) {
    webpack(webpackConfig, function (err, stats) {
        if (err)
            throw new gutil.PluginError('webpack:build', err);
        gutil.log('[webpack:build] Completed\n' + stats.toString({
            assets: true,
            chunks: false,
            chunkModules: false,
            colors: true,
            hash: false,
            timings: false,
            version: false
        }));
        callback();
    });
});
