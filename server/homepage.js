'use strict';
// ------------------------------------------------------------------------
//
//  The Grumpy Wizards Website Service
//  Copyright (C) 2016 Adrian Hall
//
// ------------------------------------------------------------------------
//  Creates an express application server.
// ------------------------------------------------------------------------
/* global __dirname */
/* eslint-disable no-sync */

var fs = require('fs'),
    path = require('path');

var homePageFilename = path.join(__dirname, 'index.html');
var homePage = fs.readFileSync(homePageFilename, 'utf8');

/**
 * Service the home page using the loaded index.html
 * @param {express.Request} request the request object
 * @param {express.Response} response the response object
 */
function serviceHomePage(request, response) {
    response.status(200).type('text/html').send(homePage);
}

module.exports = serviceHomePage;
