import config from 'config';
import express from 'express';

let configRouter = express.Router(); // eslint-disable-line new-cap

/*
 * Implement the /config/auth endpoint
 */
configRouter.get('/auth', (req, res) => {
    let json = {
        provider: config.get('auth.provider')
    };
    res.status(200).type('application/json').send(json);
});

export default configRouter;
