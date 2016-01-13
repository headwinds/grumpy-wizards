'use strict';
// ------------------------------------------------------------------------
//
//  The Grumpy Wizards Website Service
//  Copyright (C) 2016 Adrian Hall
//
// ------------------------------------------------------------------------
//  Creates an express application server.
// ------------------------------------------------------------------------
var bodyParser = require('body-parser'),
    compression = require('compression'),
    config = require('config'),
    express = require('express'),
    logCollector = require('express-winston'),
    homepage = require('./homepage'),
    logger = require('./logger');
var staticFiles = config.env === 'production' ? require('./staticFiles') : require('./webpackFiles');

/**
 * Create an express web application and configure it
 *
 * @param {boolean} [logging=true] log web transactions
 * @returns {Promise.<express>} A promise that resolves to an express application
 */
module.exports = exports = function webApplication(logging) {
    var app = express();

    if (typeof logging === 'undefined' || logging === true)
        app.use(logCollector.logger({ winstonInstance: logger, colorStatus: true, statusLevels: true }));

    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.get('/', homepage);
    app.use(staticFiles);

    // The server.js file expects that the webApplication function returns a Promise
    // that resolves to an express application.
    return new Promise(function (resolve) {
        app.use(logCollector.errorLogger({ winstonInstance: logger }));
        resolve(app);
    });
};

