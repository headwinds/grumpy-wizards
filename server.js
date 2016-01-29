// ------------------------------------------------------------------------
//
//  The Grumpy Wizards Website Service
//  Copyright (C) 2016 Adrian Hall
//
// ------------------------------------------------------------------------
//  Bootstrap for starting the web application server.
// ------------------------------------------------------------------------
var config = require('config');
var http = require('http');
var logger = require('./server/logger').logger;
var webApplication = require('./server/webapp');

webApplication().then((app) => {
    var server = http.createServer(app);

    server.on('error', (error) => {
        if (error.syscall && error.code)
            logger.error(`[http.listen] ${error.syscall} ${error.code} ${error.message}`);
        throw error;
    });

    server.on('listening', () => {
        var port = server.address().port;
        logger.info(`[http.listen] Listening on port ${port}`);
    });

    app.set('port', config.get('port'));
    server.listen(app.get('port'));
});
