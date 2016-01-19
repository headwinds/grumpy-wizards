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
import cookieParser from 'cookie-parser';
import express from 'express';
import { transactionLogger, errorLogger } from './logger';
import staticFiles from './static';
import zumo from 'azure-mobile-apps';

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
    app.use(cookieParser());

    // Azure Mobile Apps
    let mobileApp = zumo({ swagger: true, homePage: false });
    mobileApp.api.import('./api');
    app.use(mobileApp);

    // Static Files
    app.use(staticFiles);

    // Promisify the response as we have no async initialization yet.
    return mobileApp.tables.initialize().then(() => {
        app.use(errorLogger);
        return app;
    });
}
