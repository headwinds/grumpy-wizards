module.exports = {
    entry: {
        grumpywizards: './client/src/app.jsx'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: [ 'jsx', 'babel' ],
                exclude: /node_modules/
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    output: {
        filename: 'public/[name].js'
    }
};
