import winston from 'winston';

let logger = new winston.Logger({
    transports: [
        new winston.transports.Console({ colorize: true, timestamp: true })
    ]
});

export default logger;
