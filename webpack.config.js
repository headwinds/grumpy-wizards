/* global __dirname */
/* eslint-env node */
/* eslint no-var:0 */
var autoprefixer = require('autoprefixer'),
    config = require('config'),
    path = require('path'),
    webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var configuration = {
    devtool: 'source-map',
    entry: [
        path.join(__dirname, 'client/src/app.jsx')
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    module: {
        loaders: [
            // Javascript
            { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
            // Stylesheets
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap|postcss') },
            { test: /\.s(a|c)ss$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass?sourceMap') },
            // Font Definitions
            { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
            { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
            { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
            { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
            { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' }
        ]
    },
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/',
        filename: 'grumpywizards.js'
    },
    plugins: [
        new ExtractTextPlugin('grumpywizards.css')
    ],
    target: 'web',

    // Plugin and Loader options
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
        configFile: path.join(__dirname, './.stylelint.config.js')
    },
    sassLoader: {
        includePaths: [ 'client/style' ]
    }
};

if (config.env === 'development') {
    // Override the entry for hot reloading
    configuration.entry = [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        path.join(__dirname, 'client/src/app.jsx')
    ];

    // lint the files during development
    configuration.module.preLoaders = [
        // Javascript
        { test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/ },
        // Stylesheets
        { test: /\.s(a|c)ss$/, loader: 'stylelint' }
    ];

    // Compile the SASS into CSS and load via stylesheets during development
    configuration.module.loaders = [
        // Javascript
        { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
        // Stylesheets
        { test: /\.css$/, loader: 'style!css?sourceMap|postcss' },
        { test: /\.s(a|c)ss$/, loader: 'style!css?sourceMap!postcss!sass?sourceMap' },
        // Font Definitions
        { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
        { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
        { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
        { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
        { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' }
    ];

    // Add Hot Module Replacement to the dev server
    // We don't need the ExtractTextPlugin() plugin during development
    configuration.plugins = [
        new webpack.HotModuleReplacementPlugin()
    ];
}

module.exports = configuration;
