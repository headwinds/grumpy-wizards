'use strict';
// ------------------------------------------------------------------------
//
//  The Grumpy Wizards Website Service
//  Copyright (C) 2016 Adrian Hall
//
// ------------------------------------------------------------------------
//  Bootstrap for starting the web application server.
// ------------------------------------------------------------------------

var config = require('config'),
    http = require('http'),
    webApp = require('./server/index');

/* eslint-disable no-console */
webApp().then(function (app) {
    var server = http.createServer(app);

    server.on('error', function (error) {
        if (error.syscall && error.code)
            console.error('[http.listen]' + error.syscall + ' ' + error.code + ' ' + error.message);
        throw error;
    });

    server.on('listening', function () {
        var addr = server.address();
        console.info('[http.listen] Listening on port ' + addr.port);
    });

    app.set('port', config.get('port'));
    server.listen(app.get('port'));
});
