/* global __dirname */

// ExpressJS API Imports
import bodyParser from 'body-parser';
import compression from 'compression';
import config from 'config';
import express from 'express';
import logCollector from 'express-winston';


// Local Imports
import configRouter from './config';
import indexPage from './indexpage';
import logger from './logger';
import staticFiles from './staticFiles';

/**
 * Create an express web application and configure it.
 *
 * @param {boolean} [logging=true] - add transaction logging
 * @returns {Promise.<express>} A promisified express application
 */
function createWebApplication(logging = true) {
    let app = express();

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

    // Overrides for the API Definition
    app.use('/config', configRouter);

    // Display the index.html file
    app.get('/', indexPage);

    // load the static file service - this is dependent on the NODE_ENV
    staticFiles(app);

    // We need to return a promise so that we can support the base bin/www functionality
    return new Promise((resolve) => {
        app.use(logCollector.errorLogger({ winstonInstance: logger }));
        resolve(app);
    });
}

export default createWebApplication;
