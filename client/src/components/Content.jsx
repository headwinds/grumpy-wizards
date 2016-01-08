import React from 'react';
import ClientLogger from '../flux/logger';

let logger = new ClientLogger('Content.jsx');

/**
 * Eventually, this will be the content router
 * @extends React.Component
 */
export default class Content extends React.Component {
    /**
     * Render the component
     *
     * @returns {JSX.Element} the JSX Rendering of this component
     * @overrides React.Component#render
     */
    render() {
        logger.entry('render');
        let jsx = <section className="content"></section>;
        logger.exit('render');
        return jsx;
    }
}
