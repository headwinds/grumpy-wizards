/* global __dirname */
var path = require('path');

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
            { test: /\.s(a|c)ss$/, loader: 'sasslint' }
        ],
        loaders: [
            // Javascript
            { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
            // Stylesheets
            { test: /\.css$/, loader: ExtractTextPlugin.extract( 'style', 'css?sourceMap') },
            { test: /\.s(a|c)ss$/, loader: ExtractTextPlugin.extract( 'style', 'css?sourceMap!sass?sourceMap') },
            // Font Definitions
            { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
            { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
            { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
            { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
            { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' }
        ]
    },
    output: {
        filename: 'public/[name].js'
    },
    plugins: [
        new ExtractTextPlugin('public/grumpywizards.css')
    ],

    // Plugin and Loader options
    eslint: {
        failOnWarning: false,
        failOnError: true
    },
    sasslint: {
        configFile: path.join(__dirname, './.sass-lint.yml')
    },
    sassLoader: {
        includePaths: [ 'client/style' ]
    }
};
