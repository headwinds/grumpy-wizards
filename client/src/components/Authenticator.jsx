import React from 'react';
import ClientLogger from '../flux/logger';

let logger = new ClientLogger('Authenticator.jsx');

require('./Authenticator.scss');

/**
 * Provide an Auth0 login/logout capability based on the AppStore
 * @extends React.Component
 */
export default class Authenticator extends React.Component {
    /**
    * Render the component
    *
    * @returns {JSX.Element} the JSX Rendering of this component
    * @overrides React.Component#render
    */
    render() {
        logger.entry('render');
        let jsx = (
            <div className="authenticator">
                <ul>
                    <li><span className="fa fa-spinner fa-pulse"></span></li>
                </ul>
            </div>
        );
        logger.exit('render');
        return jsx;
    }
}
