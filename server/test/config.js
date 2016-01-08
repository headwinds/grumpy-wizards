/* global describe, it */
import { expect } from 'chai';
import request from 'supertest';
import webApp from '../src/app';

describe('server/src/config.js', () => {
    describe('/config/auth', () => {
        it('should provide a GET method', (done) => {
            webApp(false).then((app) => {
                request(app)
                    .get('/config/auth')
                    .expect(200)
                    .end((err) => { return done(err); });
            });
        });

        it('should return a JSON document', (done) => {
            webApp(false).then((app) => {
                request(app)
                    .get('/config/auth')
                    .expect('Content-Type', /application\/json/)
                    .end((err) => { return done(err); });
            });
        });

        it('should have the proper fields', (done) => {
            webApp(false).then((app) => {
                request(app)
                    .get('/config/auth')
                    .expect({ clientid: 'NOT-SET', domain: 'NOT-SET' })
                    .end((err) => { return done(err); });
            });
        });
    });
});
