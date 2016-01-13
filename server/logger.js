'use strict';
// ------------------------------------------------------------------------
//
//  The Grumpy Wizards Website Service
//  Copyright (C) 2016 Adrian Hall
//
// ------------------------------------------------------------------------
//  Configure the Winston Logger as a singleton.
// ------------------------------------------------------------------------
var winston = require('winston');

var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({ colorize: true, timestamp: true })
    ]
});

module.exports = logger;
