/* global __dirname */
var autoprefixer = require('autoprefixer'),
    path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        grumpywizards: './client/src/app.jsx'
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    module: {
        preLoaders: [
            // Javascript
            { test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/ },
            // Stylesheets
            { test: /\.s(a|c)ss$/, loader: 'stylelint' }
        ],
        loaders: [
            // Javascript
            { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
            // Stylesheets
            { test: /\.css$/, loader: ExtractTextPlugin.extract( 'style', 'css?sourceMap|postcss') },
            { test: /\.s(a|c)ss$/, loader: ExtractTextPlugin.extract( 'style', 'css?sourceMap!postcss!sass?sourceMap') },
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
        filename: '[name].js'
    },
    plugins: [
        new ExtractTextPlugin('grumpywizards.css')
    ],

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
