'use strict';
// ------------------------------------------------------------------------
//
//  The Grumpy Wizards Website Service
//  Copyright (C) 2016 Adrian Hall
//
// ------------------------------------------------------------------------
//  Development version for static files - supports hot reloading
// ------------------------------------------------------------------------
var express = require('express'),
    webpack = require('webpack'),
    devServer = require('webpack-dev-middleware'),
    hotServer = require('webpack-hot-middleware'),
    config = require('../webpack.config.js');

var router = express.Router(), // eslint-disable-line new-cap
    compiler = webpack(config);
router.use(devServer(compiler, {
    publicPath: config.output.publicPath || '/',
    stats: { colors: true }
}));
router.use(hotServer(compiler, {
    log: console.log // eslint-disable-line no-console
}));

module.exports = router;
