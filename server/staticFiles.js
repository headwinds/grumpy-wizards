'use strict';
// ------------------------------------------------------------------------
//
//  The Grumpy Wizards Website Service
//  Copyright (C) 2016 Adrian Hall
//
// ------------------------------------------------------------------------
//  Production version for static files.  No hot reloading.
// ------------------------------------------------------------------------
var express = require('express'),
    serveStatic = require('serve-static');

var router = express.Router(); // eslint-disable-line new-cap
router.use(serveStatic('public', {
    dotfile: 'ignore',
    etag: true,
    index: false,
    lastModified: true
}));

module.exports = router;
