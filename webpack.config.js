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
var autoprefixer = require('autoprefixer'),
    config = require('config'),
    path = require('path'),
    webpack = require('webpack');

var configuration = {
    devtool: 'source-map',
    entry: [ path.join(__dirname, 'client/app.jsx') ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    module: {
        loaders: [
            // JavaScript and React JSX Files
            { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/ },

            // Stylesheets
            { test: /\.css$/, loader: 'style!css?sourceMap|postcss' },
            { test: /\.scss$/, loader: 'style!css?sourceMap!postcss!sass?sourceMap' },
            { test: /\.scss$/, loader: 'stylelint' }
        ]
    },
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/',
        filename: 'grumpywizards.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }})
    ],
    target: 'web',

    // Loader options
    eslint: {
        failOnWarning: false,
        failOnError: true
    },
    postcss: [
        autoprefixer({
            browsers: [ '> 5%', 'last 2 versions' ]
        })
    ],
    stylelint: {
        configFile: path.join(__dirname, 'stylelint.config.js')
    },
    sassLoader: {
        includePaths: [ 'client/style' ]
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
