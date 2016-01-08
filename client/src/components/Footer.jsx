import React from 'react';
import ClientLogger from '../flux/logger';

require('./Footer.scss');

let logger = new ClientLogger('Footer.jsx');

/**
 * @extends React.Component
 */
export default class Footer extends React.Component {
    /**
     * Render the component
     *
     * @returns {JSX.Element} the JSX Rendering of this component
     * @overrides React.Component#render
     */
    render() {
        logger.entry('render');
        let jsx = (
            <footer>
                <div className="footer--left"></div>
                <div className="footer--center"></div>
                <div className="footer--right"></div>
            </footer>
        );
        logger.exit('render');
        return jsx;
    }
}
