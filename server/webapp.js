// ------------------------------------------------------------------------
//
//  The Grumpy Wizards Website Service
//  Copyright (C) 2016 Adrian Hall
//
// ------------------------------------------------------------------------
//  Creates an express application server.
// ------------------------------------------------------------------------
import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import { transactionLogger, errorLogger } from './logger';
import customRouter from './routes';
import staticFiles from './static';

/**
 * Create an express web application and configure it
 *
 * @param {boolean} logging - set to false to disable all logging
 * @returns {Promise.<express>} A promise that resolves to an express applications
 */
export default function webApplication(logging = true) {
    let app = express();

    // Basic application settings & middleware
    if (logging) app.use(transactionLogger);
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Custom router
    app.use(customRouter);

    // Static Files
    app.use(staticFiles);

    // Promisify the response as we have no async initialization yet.
    return new Promise((resolve) => {
        app.use(errorLogger);
        resolve(app);
    });
}
