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

router.get('/api/config', (request, response) => {
    let configuration = {
        auth: {
            endpoint: config.get('auth.endpoint')
        }
    };

    response.status(200).type('application/json').send(configuration);
});

export default router;
