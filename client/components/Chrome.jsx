import Radium from 'radium';
import React from 'react';

// Components
import AuthenticationButton from './AuthenticationButton.jsx';
import AppBar from 'material-ui/lib/app-bar';
import LeftMenu from './LeftMenu.jsx';

import ClientLogger from '../lib/logger';
import appStyle from '../style/appStyle';
import appStore from '../lib/app-store';

let logger = new ClientLogger('Chrome.jsx');

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
     *
     * @param {Object} props the property values
     */
    constructor(props) {
        logger.entry('$constructor');
        super(props);

        this.state = {
            error: false,
            authConfig: false,
            authInfo: null,
            isAuthenticated: false,
            leftMenuOpen: false
        };
        logger.exit('$constructor');
    }

    /**
     * Part of the react API that is called when the component
     * is just about to be added to the DOM
     */
    componentWillMount() {
        logger.entry('componentWillMount');
        this.appStoreId = appStore.addStoreListener(() => {
            this.updateState();
        });
        this.updateState();
        logger.exit('componentWillMount');
    }

    /**
     * Part of the react API that is called when the component
     * is just about to be removed from the DOM
     */
    componentWillUnmount() {
        logger.entry('componentWillUnmount');
        appStore.removeStoreListener(this.appStoreId);
        this.appStoreId = null;
        logger.exit('componentWillUnmount');
    }

    /**
     * Returns the Radium styles that will be used in the
     * component rendering
     * @returns {Object} the Radium stylesheet
     */
    stylesheet() {
        return {
            chrome: {
                display: 'flex',
                flexFlow: 'column nowrap',
                height: '100%',
                width: '100%'
            },
            appbar: {
                backgroundColor: appStyle.color1
            },
            error: {
                backgroundColor: appStyle.redback,
                color: '#FFFFFF',
                font: `1rem ${appStyle.fonts.sans}`,
                padding: '0.4rem 0',
                textAlign: 'center',
                width: '100%'
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
            leftmenu: {
                usercard: {
                    backgroundColor: appStyle.color1
                }
            }
        };
    }

    /**
     * Update the component state
     */
    updateState() {
        logger.entry('updateState');
        this.setState({
            error: appStore.errorMessage,
            isAuthenticated: appStore.isAuthenticated
        });
        logger.exit('updateState');
    }

    /**
     * Event Handler to change the display/open of the left nav
     *
     * @param {bool} open if the left nav should be open or closed
     * @returns {bool} true if the event was handled
     */
    displayLeftMenu(open) {
        logger.entry('displayLeftMenu', event);

        let newState = { leftMenuOpen: open };
        logger.debug(`Setting state to ${JSON.stringify(newState)}`);
        this.setState(newState);

        return logger.exit('displayLeftMenu', true);
    }

    /**
     * Event Handler to login to the system
     * @returns {bool} true if the event was handled (although it should not return on success)
     */
    onAuthIconTap() {
        logger.entry('onAuthIconTap');

        if (this.state.error || !appStore.authenticationEndpoint) {
            logger.debug('Disabling Authentication link - no auth configuration received');
            return logger.exit('onAuthIconTap', false);
        }

        if (this.state.authenticated) {
            logger.debug('Disabling Authentication link - Logout is not implemented');
            return logger.exit('onauthIconTap', false);
        }

        logger.info(`Redirecting to authentication endpoint: ${appStore.authenticationEndpoint}`);
        window.location = appStore.authenticationEndpoint;
        logger.exit('onAuthIconTap', true);
    }

    /**
     * Render the component
     * @returns {JSXElement} the rendered component
     * @overrides React.Component#render
     */
    render() {
        logger.entry('render');

        // Style
        let styles = this.stylesheet();

        // Define Event Handlers
        let onAuthIconTap = () => { return this.onAuthIconTap(); };
        let onMenuIconTap = () => { return this.displayLeftMenu(!this.state.leftMenuOpen); };
        let onRequestChange = (open) => { return this.displayLeftMenu(open); };

        // Components
        let authenticationIndicator = (
            <AuthenticationButton
                authenticated={this.state.isAuthenticated}
                error={this.state.error}
                onTouchTap={onAuthIconTap} />
        );

        // If there is an error, we need to display it
        let errorIndicator = '';
        if (this.state.error) {
            logger.debug(`setting errorIndicator to ${this.state.error}`);
            errorIndicator = <div style={styles.error}>{this.state.error}</div>;
        }

        let jsx = (
            <div style={styles.chrome}>
                {errorIndicator}
                <header>
                    <AppBar
                        iconElementRight={authenticationIndicator}
                        style={styles.appbar}
                        title={'Grumpy Wizards'}
                        onLeftIconButtonTouchTap={onMenuIconTap} />
                    <LeftMenu
                        authenticated={this.state.isAuthenticated}
                        onRequestChange={onRequestChange}
                        open={this.state.leftMenuOpen} />
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
