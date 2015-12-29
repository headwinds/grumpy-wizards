/* global describe, it */
import { expect } from 'chai';
import createWebApplication from '../server/app';

describe('server/app.js', () => {
    it('should export a function', () => {
        expect(createWebApplication).to.be.a('function');
    });

    it('should return a Promise', () => {
        expect(createWebApplication()).to.be.an.instanceof(Promise);
    });

    it('should resolve to an express Application', () => {
        createWebApplication().then((app) => {
            expect(app).to.be.a('function');
        });
    });
});
