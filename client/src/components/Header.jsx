import React from 'react';
import ClientLogger from '../flux/logger';

import Vertical from './Vertical.jsx';

require('./Header.scss');

let logger = new ClientLogger('Header.jsx');

/**
 * @extends React.Component
 */
export default class Header extends React.Component {
    /**
     * Render the component
     *
     * @returns {JSX.Element} the JSX Rendering of this component
     * @overrides React.Component#render
     */
    render() {
        logger.entry('render');
        let jsx = (
            <header>
                <div className="header--left"></div>
                <div className="header--center">
                    <Vertical align="middle">
                        <h1>{'Grumpy Wizards'}</h1>
                    </Vertical>
                </div>
                <div className="header--right"></div>
            </header>
        );
        logger.exit('render');
        return jsx;
    }
}
