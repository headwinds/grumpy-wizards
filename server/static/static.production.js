var serveStatic = require('serve-static');

/**
 * Production version of the static service
 * @param {express.Router} router the Express Router
 * @returns {void}
 */
module.exports = function (router) {
    router.use(serveStatic('public', {
        dotfile: 'ignore',
        etag: true,
        index: false,
        lastModified: true
    }));
};
