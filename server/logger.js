// ------------------------------------------------------------------------
//
//  The Grumpy Wizards Website Service
//  Copyright (C) 2016 Adrian Hall
//
// ------------------------------------------------------------------------
//  Configure the Winston Logger as a singleton.
// ------------------------------------------------------------------------
import winston from 'winston';
import logCollector from 'express-winston';

let logger = new winston.Logger({
    level: 'silly',
    transports: [
        new winston.transports.Console({ colorize: true, timestamp: true })
    ]
});

let transactionLogger = logCollector.logger({
    winstonInstance: logger,
    colorStatus: true,
    statusLevels: true
});

let errorLogger = logCollector.logger({
    winstonInstance: logger
});

export {
    transactionLogger,
    errorLogger,
    logger
};
