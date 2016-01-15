// ------------------------------------------------------------------------
//
//  The Grumpy Wizards Website Service
//  Copyright (C) 2016 Adrian Hall
//
// ------------------------------------------------------------------------
//  Bootstrap for starting the web application server.
// ------------------------------------------------------------------------
import config from 'config';
import http from 'http';
import { logger } from './logger';
import webApplication from './webapp';

webApplication().then((app) => {
    let server = http.createServer(app);

    server.on('error', (error) => {
        if (error.syscall && error.code)
            logger.error(`[http.listen] ${error.syscall} ${error.code} ${error.message}`);
        throw error;
    });

    server.on('listening', () => {
        let port = server.address().port;
        logger.info(`[http.listen] Listening on port ${port}`);
    });

    app.set('port', config.get('port'));
    server.listen(app.get('port'));
});
