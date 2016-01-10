import config from 'config';
import express from 'express';

let configRouter = express.Router(); // eslint-disable-line new-cap

/*
 * Implement the /config/auth endpoint
 */
configRouter.get('/auth', (req, res) => {
    let json = {
        clientid: config.get('auth.clientid'),
        domain: config.get('auth.domain')
    };
    res.status(200).type('application/json').send(json);
});

export default configRouter;
