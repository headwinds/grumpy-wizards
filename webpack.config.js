var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        grumpywizards: './client/src/app.jsx'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style', // The backup style loader
                    'css?sourceMap!sass?sourceMap'
                )
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    output: {
        filename: 'public/[name].js'
    },
    sassLoader: {
        includePaths: [ 'client/style' ]
    },
    plugins: [
        new ExtractTextPlugin('public/grumpywizards.css')
    ]
};
