'use strict';
// ------------------------------------------------------------------------
//
//  The Grumpy Wizards Website Service
//  Copyright (C) 2016 Adrian Hall
//
// ------------------------------------------------------------------------
//  Client Package generation
// ------------------------------------------------------------------------
/* global __dirname */
var config = require('config'),
    path = require('path'),
    webpack = require('webpack');

var jsxLoader = (config.get('env') === 'development') ? 'react-hot!babel' : 'babel';

var configuration = {
    devtool: 'source-map',
    entry: [ path.join(__dirname, 'client/app.jsx') ],
    module: {
        loaders: [
            // JavaScript and React JSX Files
            { test: /\.jsx?$/, loader: jsxLoader, exclude: /node_modules/ },
            { test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/ },
        ]
    },
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/',
        filename: 'grumpywizards.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ mangle: false, compress: { warnings: false }}),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': `"${config.env}"` })
    ],
    resolve: {
        modulesDirectories: [ 'node_modules' ],
        extensions: [ '', '.js', '.jsx' ]
    },
    target: 'web',

    // Loader options
    eslint: {
        failOnWarning: false,
        failOnError: true
    }
};

if (config.env === 'development') {
    configuration.entry.unshift(
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client'
    );
    configuration.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = configuration;
