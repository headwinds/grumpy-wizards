/* global describe, it */
import { expect } from 'chai';
import React from 'react';

import Application from '../../src/views/Application.jsx';

describe('client/js/views/Application.jsx', () => {
    it('should be a React.Component', () => {
        let component = new Application();
        expect(component).to.be.an.instanceof(React.Component);
    });

    it('should have a render method', () => {
        let component = new Application();
        expect(component.render).to.be.a('function');
    });
});
