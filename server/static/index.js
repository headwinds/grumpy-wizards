// ------------------------------------------------------------------------
//
//  The Grumpy Wizards Website Service
//  Copyright (C) 2016 Adrian Hall
//
// ------------------------------------------------------------------------
//  Static File Router
// ------------------------------------------------------------------------
/* global __dirname */
var config = require('config');
var express = require('express');
var fs = require('fs');
var path = require('path');
var serveStatic = require(`./static.${config.get('env')}.js`);

var fileContents = {};
var router = express.Router(); // eslint-disable-line new-cap

/**
 * Load the specified HTML file, caching the contents
 * in the fileContents object.
 * @param {string} filename the file name to load
 * @returns {string} the contents of the file
 */
function loadHtmlFile(filename) {
    var contents = '', file = path.join(__dirname, filename);
    if (!Object.hasOwnProperty(fileContents, filename)) {
        contents = fs.readFileSync(file, 'utf8'); // eslint-disable-line no-sync
        fileContents[filename] = contents
            .replace(/\$\{config.base\}/g, config.get('base'))
            .replace(/\$\{config.env\}/g, config.get('env'))
            .replace(/\$\{config.library.font-awesome}/g, config.get('library.font-awesome'))
            .replace(/\$\{config.library.mdi}/g, config.get('library.mdi'))
            .replace(/\$\{config.library.core-js}/g, config.get('library.core-js'))
            ;
    }
    return fileContents[filename];
}

// Home Page
router.get('/', (request, response) => {
    return response
        .status(200)
        .type('text/html')
        .send(loadHtmlFile('index.html'));
});

// Service static files - different for dev vs. prod
serveStatic(router);

module.exports = router;
