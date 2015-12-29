import azureMobileApp from 'azure-mobile-apps';
import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import logCollector from 'express-winston';
import staticFiles from 'serve-static';
import logger from './logger';

/**
 * Create an express web application and configure it.
 *
 * @param {boolean} [logging=true] - add transaction logging
 * @returns {Promise.<express>} A promisified express application
 */
function createWebApplication(logging = true) {
    let app = express(),
        mobile = azureMobileApp();

    if (typeof logging === 'undefined' || logging === true) {
        app.use(logCollector.logger({
            winstonInstance: logger,
            colorStatus: true,
            statusLevels: true
        }));
    }

    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(staticFiles('public', {
        dotfile: 'ignore',
        etag: true,
        index: 'index.html',
        lastModified: true
    }));

    mobile.tables.import('./tables');
    mobile.api.import('./api');

    return mobile.tables.initialize().then(() => {
        app.use(mobile);
        app.use(logCollector.errorLogger({ winstonInstance: logger }));
        return app;
    });
}

export default createWebApplication;
