import config from 'config';
import express from 'express';
import jwt from 'jsonwebtoken';

let authRouter = express.Router(); // eslint-disable-line new-cap

/*
 * Implement the /auth/verify endpoint
 *
 * Given the provided JWT, try to decode with the supplied config
 * client id and secret.  There are a few possibilities
 *  1) If the JWT is invalid, then send a 401 Unauthenticated
 *  2) If the JWT is expired, then send a 401 Unauthenticated
 *  3) If the JWT is valid, then decode and send the response
 */
authRouter.get('/verify', (request, response) => {
    let authHeader = request.get('Authorization');
    if (!authHeader) {
        response.status(401).type('text/plain').send('No Authorization Header');
        return;
    }
    if (authHeader.indexOf('Bearer ') !== 0) {
        response.status(401).type('text/plain').send('Authorization Header is not a Bearer');
        return;
    }
    let token = authHeader.substring(7);
    try {
        let secretBuffer = new Buffer(config.auth.clientsecret, 'base64');
        let decodedToken = jwt.verify(token, secretBuffer);
        response.status(200).type('application/json').send(decodedToken);
        return;
    } catch (err) {
        response.status(401).type('text/plain').send('Authorization Header was invalid');
        return;
    }
});

export default authRouter;
