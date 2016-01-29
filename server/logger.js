// ------------------------------------------------------------------------
//
//  The Grumpy Wizards Website Service
//  Copyright (C) 2016 Adrian Hall
//
// ------------------------------------------------------------------------
//  Configure the Winston Logger as a singleton.
// ------------------------------------------------------------------------
var winston = require('winston');
var logCollector = require('express-winston');

var logger = new winston.Logger({
    level: 'silly',
    transports: [
        new winston.transports.Console({ colorize: true, timestamp: true })
    ]
});

var transactionLogger = logCollector.logger({
    winstonInstance: logger,
    colorStatus: true,
    statusLevels: true
});

var errorLogger = logCollector.logger({
    winstonInstance: logger
});

module.exports = {
    transactionLogger: transactionLogger,
    errorLogger: errorLogger,
    logger: logger
};
