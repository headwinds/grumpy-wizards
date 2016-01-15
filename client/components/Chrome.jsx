import Radium from 'radium';
import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import { Card, CardHeader } from 'material-ui/lib/card';
import IconButton from 'material-ui/lib/icon-button';
import LeftNav from 'material-ui/lib/left-nav';
import appStyle from '../style/appStyle';

import ClientLogger from '../lib/logger';

let logger = new ClientLogger(__filename);

/**
 * Provides all the chrome around the application
 * @extends React.Component
 */
@Radium
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

        // Style
        let styles = {
            chrome: {
                display: 'flex',
                flexFlow: 'column nowrap',
                height: '100%',
                width: '100%'
            },
            appbar: {
                backgroundColor: appStyle.color1
            },
            footer: {
                backgroundColor: appStyle.color5,
                display: 'block',
                textAlign: 'center'
            },
            footertext: {
                color: appStyle.trans8,
                font: `0.8rem ${appStyle.fonts.sans}`,
                margin: '0.5rem 0'
            },
            leftnav: {
                usercard: {
                    backgroundColor: appStyle.color1
                }
            }
        };

        // Define Event Handlers
        let onMenuIconTap = (event) => { return this.onLeftNavDisplay(event, !this.state.leftNavIsOpen); };
        let onRequestChange = (open) => { return this.onLeftNavDisplay(null, open); };

        // Components
        let leftNav = (
            <LeftNav docked={false} onRequestChange={onRequestChange} open={this.state.leftNavIsOpen}>
                <Card style={styles.leftnav.usercard}>
                    <CardHeader
                        title="Not Logged In"
                        subtitle="Log in to see more"
                        avatar="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm"/>
                </Card>
            </LeftNav>
        );

        let authenticationIndicator = (
            <IconButton iconClassName="mdi mdi-login" tooltip="Login" tooltipPosition="bottom-center" />
        );

        let jsx = (
            <div style={styles.chrome}>
                <header>
                    <AppBar
                        iconElementRight={authenticationIndicator}
                        style={styles.appbar}
                        title={'Grumpy Wizards'}
                        onLeftIconButtonTouchTap={onMenuIconTap} />
                    {leftNav}
                </header>
                <section style={{ flexGrow: 1 }}>
                    {this.props.children}
                </section>
                <footer style={styles.footer}>
                    <h6 style={styles.footertext}>{'Copyright \u00a9 2016 Adrian Hall'}</h6>
                </footer>
            </div>

        );

        return logger.exit('render', jsx);
    }
}
