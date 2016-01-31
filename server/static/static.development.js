var webpack = require('webpack'),
    devServer = require('webpack-dev-middleware'),
    hotServer = require('webpack-hot-middleware'),
    serveStatic = require('serve-static'),
    webpackConfig = require('../../webpack.config.js'),
    logger = require('../logger').logger;

logger.warn(`[webpack-dev-server] wait for bundle to be VALID before reload`);

/**
 * Development version of the serve-static area
 * Uses webpack to serve files
 * @param {express.Router} router the Express Router
 * @returns {void}
 */
module.exports = function (router) {
    var compiler = webpack(webpackConfig);
    router.use(devServer(compiler, {
        publicPath: webpackConfig.output.publicPath || '/',
        stats: {
            assets: true,
            chunks: false,
            chunkModules: false,
            colors: true,
            hash: false,
            timings: false,
            version: false
        }
    }));
    router.use(hotServer(compiler, {
        log: console.log // eslint-disable-line no-console
    }));
    router.use(serveStatic('public', {
        dotfile: 'ignore',
        etag: true,
        index: false,
        lastModified: true
    }));
};
