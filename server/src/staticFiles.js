// Imports for Webpack Development Server
import webpack from 'webpack';
import devServer from 'webpack-dev-middleware';
import hotServer from 'webpack-hot-middleware';
import staticFiles from 'serve-static';
import config from 'config';
import webpackConfig from '../../webpack.config.js';

/**
 * Links the webpack hot reload service into the express app
 * @param {express.Router} app the express application
 * @returns {express.Router} the express application
 */
function linkStaticFiles(app) {
    if (config.env === 'development') {
        let compiler = webpack(webpackConfig);

        app.use(devServer(compiler, {
            publicPath: webpackConfig.output.publicPath || '/',
            stats: { colors: true }
        }));

        app.use(hotServer(compiler, {
            // NOTE: We must use console.log in hotServer - using logger won't work
            log: console.log // eslint-disable-line no-console
        }));
    } else {
        app.use(staticFiles('public', {
            dotfile: 'ignore',
            etag: true,
            index: false,
            lastModified: true
        }));
    }

    return app;
}

export default linkStaticFiles;
