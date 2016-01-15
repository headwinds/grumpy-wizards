// ------------------------------------------------------------------------
//
//  The Grumpy Wizards Website Service
//  Copyright (C) 2016 Adrian Hall
//
// ------------------------------------------------------------------------
//  Static File Router
// ------------------------------------------------------------------------
/* global __dirname */
import config from 'config';
import express from 'express';
import fs from 'fs';
import { logger } from '../logger';
import path from 'path';
import serveStatic from 'serve-static';

// Development
import devServer from 'webpack-dev-middleware';
import hotServer from 'webpack-hot-middleware';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config.js';

let router = express.Router(); // eslint-disable-line new-cap

// Load the Home Page and link in.
let indexFile = path.join(__dirname, 'index.html');
let indexContents = fs.readFileSync(indexFile, 'utf8'); // eslint-disable-line no-sync
router.get('/', (request, response) => {
    response.status(200).type('text/html').send(indexContents);
});

if (config.get('env') === 'production') {
    router.use(serveStatic('public', {
        dotfile: 'ignore',
        etag: true,
        index: false,
        lastModified: true
    }));
} else {
    logger.warn(`[webpack-dev-server] wait for bundle to be VALID before reload`);
    let compiler = webpack(webpackConfig);
    router.use(devServer(compiler, {
        publicPath: webpackConfig.output.publicPath || '/',
        stats: { colors: true }
    }));
    router.use(hotServer(compiler, {
        log: console.log // eslint-disable-line no-console
    }));
}

export default router;
