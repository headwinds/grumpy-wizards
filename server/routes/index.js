// ------------------------------------------------------------------------
//
//  The Grumpy Wizards Website Service
//  Copyright (C) 2016 Adrian Hall
//
// ------------------------------------------------------------------------
//  Core router for the application
// ------------------------------------------------------------------------
import config from 'config';
import express from 'express';

let router = express.Router(); // eslint-disable-line new-cap

// Returns the application client configuration
router.get('/api/config', (request, response) => {
    let configuration = {
        auth: {
            endpoint: config.get('auth.endpoint')
        }
    };

    response.status(200).type('application/json').send(configuration);
});

// Returns a decode of the cookies presented to the site
router.get('/api/cookie', (request, response) => {
    response.status(200).type('application/json').send(request.cookies);
});

export default router;
