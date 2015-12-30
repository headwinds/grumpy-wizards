/* global describe, it */
import { expect } from 'chai';
import winston from 'winston';
import logger from '../src/logger';

describe('server/src/logger.js', () => {
    it('should export a winston object', () => {
        expect(logger).to.be.an.instanceof(winston.Logger);
    });
});
