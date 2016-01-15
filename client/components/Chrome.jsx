import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';

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

        this.state = {
            leftNavIsOpen: false
        };

        logger.exit('$constructor');
    }

    /**
     * Event Handler to change the display/open of the left nav
     *
     * @param {Event} event the synthetic event that generated the request
     * @param {bool} open if the left nav should be open or closed
     * @returns {bool} true if the event was handled
     */
    onLeftNavDisplay(event, open) {
        logger.entry('onLeftNavDisplay', event);

        let newState = { leftNavIsOpen: open };
        logger.debug(`Setting state to ${JSON.stringify(newState)}`);
        this.setState(newState);

        return logger.exit('onLeftNavDisplay', true);
    }

    /**
     * Render the component
     * @returns {JSXElement} the rendered component
     * @overrides React.Component#render
     */
    render() {
        logger.entry('render');

        // Define Event Handlers
        let onMenuIconTap = (event) => { return this.onLeftNavDisplay(event, !this.state.leftNavIsOpen); };
        let onRequestChange = (open) => { return this.onLeftNavDisplay(null, open); };

        // Components
        let leftNav = (
            <LeftNav docked={false} onRequestChange={onRequestChange} open={this.state.leftNavIsOpen}>
            </LeftNav>
        );

        let jsx = (
            <div className="chrome">
                <header>
                    <AppBar className="gw--appBar" onLeftIconButtonTouchTap={onMenuIconTap} title={'Grumpy Wizards'}/>
                    {leftNav}
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
