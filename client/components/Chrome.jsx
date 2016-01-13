import React from 'react';
import ClientLogger from '../lib/logger';

let logger = new ClientLogger(__filename);

require('./Chrome.scss');

/**
 * Provides all the chrome around the application
 * @extends React.Component
 */
export default class Chrome extends React.Component {
    /**
     * React property types
     *
     * @type {Object}
     * @readonly
     */
    static propTypes = {
        children: React.PropTypes.node
    };

    /**
     * Create a new component
     * @param {Object} props the property values
     */
    constructor(props) {
        logger.entry('$constructor');
        super(props);

        // this.state = {
        //     leftNavIsOpen: false
        // };

        logger.exit('$constructor');
    }

    /**
     * Render the component
     * @returns {JSXElement} the rendered component
     * @overrides React.Component#render
     */
    render() {
        logger.entry('render');

        let jsx = (
            <div className="chrome">
                <header>
                </header>
                <section className="chrome--content">
                    {this.props.children}
                </section>
                <footer>
                    <h6>{'Copyright \u00a9 2016 Adrian Hall'}</h6>
                </footer>
            </div>

        );

        return logger.exit('render', jsx);
    }
}
