import ClientLogger from '../lib/logger';
import Radium from 'radium';
import React from 'react';

// Library Components
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';

// My Components
import LeftMenu from '../components/LeftMenu.jsx';

// Default Styles
import appStyle from '../style/appStyle';

// Flux Stores
import store from '../redux/store';

let logger = new ClientLogger('components/Chrome');

/**
 * Provides all the chrome around the application
 * @extends React.Component
 */
@Radium
export default class Chrome extends React.Component {
    /**
     * React property types
     * @type {Object}
     * @readonly
     */
    static propTypes = {
        // Child page to be provided by react-router
        children: React.PropTypes.node
    };

    /**
     * Conversion of the authentication status to an icon
     * @type {Object}
     * @readonly
     */
    static statusIcons = {
        pending: 'fa fa-spinner fa-pulse',
        error: 'mdi mdi-alert-octagon',
        anonymous: 'mdi mdi-login',
        authenticated: 'mdi mdi-logout'
    };

    /**
     * Radium Stylesheet
     * @type {Object}
     * @readonly
     */
    static stylesheet = {
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
        mainpage: {
            flexGrow: 1
        }
    };

    /**
     * Create a new component
     *
     * @param {Object} props the property values
     */
    constructor(props) {
        super(props);
        logger.entry('$constructor', props);
        this.state = {
            phase: 'pending',
            user: null,
            error: null,
            leftMenu: {
                isOpen: false
            }
        };
        logger.debug('state = ', this.state);
        logger.exit('$constructor');
    }

    /**
     * React API: Called when the component is mounting itself in the DOM
     *
     * @returns {void}
     * @overrides React.Component#componentWillMount
     */
    componentWillMount() {
        logger.entry('componentWillMount');
        this.unsubscribe = store.subscribe(() => { return this.updateState(); });
        logger.exit('componentWillMount');
    }

    /**
     * React API: Called when the component is removed from the DOM
     *
     * @returns {void}
     * @overrides React.Component#componentWillUnmount
     */
    componentWillUnmount() {
        logger.entry('componentWillUnmount');
        this.unsubscribe();
        logger.exit('componentWillUnmount');
    }

    /**
     * Update the internal state of the component-view from the flux store
     */
    updateState() {
        logger.entry('updateState');
        this.setState(store.getState());
        logger.debug('New State = ', this.state);
        logger.exit('updateState');
    }

    /**
     * Event Handler - show or display the left menu
     * @param {bool} open if the left nav should be open or closed
     * @returns {bool} true if the event was handled
     */
    onManipulateLeftMenu(open) {
        logger.entry('onManipulateLeftMenu', open);
        this.setState({
            leftMenu: {
                isOpen: open
            }
        });
        logger.debug('New State = ', this.state);
        return logger.exit('onManipulateLeftMenu', true);
    }

    /**
     * Render the component
     * @returns {JSX.Element} the rendered component
     * @overrides React.Component#render
     */
    render() {
        logger.entry('render');
        let errorIndicator = '';
        if (this.state.phase === 'error') {
            logger.debug(`Will display errorIndicator = ${this.state.error}`);
            errorIndicator = <div style={Chrome.stylesheet.error}>{this.state.error}</div>;
        }

        // Properties for the AppBar component
        let iconClassName = Chrome.statusIcons[this.state.phase];
        let color = this.state.phase === 'error' ? '#ff0000' : '#ffffff';
        let appbarOptions = {
            iconElementRight: <IconButton iconStyle={{ color: color }} iconClassName={iconClassName} />,
            style: Chrome.stylesheet.appbar,
            title: 'Grumpy Wizards',
            onLeftIconButtonTouchTap: () => { return this.onManipulateLeftMenu(!this.state.leftMenu.open); }
        };
        logger.debug('appbarOptions = ', appbarOptions);

        // Properties for the LeftMenu component
        let leftMenuOptions = {
            open: this.state.leftMenu.isOpen,
            onRequestChange: (open) => { return this.onManipulateLeftMenu(open); }
        };
        logger.debug('leftMenuOptions = ', leftMenuOptions);

        return logger.exit('render', (
            <div style={Chrome.stylesheet.chrome}>
                {errorIndicator}
                <header>
                    <AppBar {...appbarOptions} />
                    <LeftMenu {...leftMenuOptions} />
                </header>
                <section style={Chrome.stylesheet.mainpage}>
                    {this.props.children}
                </section>
                <footer style={Chrome.stylesheet.footer}>
                    <h6 style={Chrome.stylesheet.footertext}>
                        {'Copyright \u00a9 2016 Adrian Hall'}
                    </h6>
                </footer>
            </div>
        ));
    }
}
