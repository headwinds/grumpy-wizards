// ------------------------------------------------------------------------
//
//  The Grumpy Wizards Website Service
//  Copyright (C) 2016 Adrian Hall
//
// ------------------------------------------------------------------------
//  Creates an express application server.
// ------------------------------------------------------------------------
/* global __dirname */
var bodyParser = require('body-parser');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var express = require('express');
var path = require('path');
var LogMaster = require('./logger');
var staticFiles = require('./static');
var zumo = require('azure-mobile-apps');
var transactionLogger = LogMaster.transactionLogger;
var errorLogger = LogMaster.errorLogger;

/**
 * Create an express web application and configure it
 *
 * @param {boolean} logging - set to false to disable all logging
 * @returns {Promise.<express>} A promise that resolves to an express applications
 */
function webApplication(logging) {
    var app = express(),
        mobileApp = zumo({ swagger: true, homePage: false });

    // Basic application settings & middleware
    if (logging) app.use(transactionLogger);
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    // Azure Mobile Apps
    mobileApp.api.import(path.join(__dirname, 'api'));
    app.use(mobileApp);

    // Static Files
    app.use(staticFiles);

    // Promisify the response as we have no async initialization yet.
    return mobileApp.tables.initialize().then(() => {
        app.use(errorLogger);
        return app;
    });
}

module.exports = webApplication;
