import React from 'react';

import MenuElement from './MenuElement.jsx';
import authStore from '../flux/AuthStore';

/**
 * LoginMenuElement Component - handles a login capability
 * @extends React.Component
 */
export default class LoginMenuElement extends React.Component {
    /**
     * The React API property definitions
     *
     * @type {Object}
     * @readonly
     * @static
     *
     * PropTypes
     *  {bool} menu - is this is a menu or an icon only?
     */
    static propTypes = {
        menu: React.PropTypes.bool.isRequired
    };

    /**
     * Create a new LoginMenuElement (React Component)
     *
     * @param {Object} props the React props
     * @returns {void}
     */
    constructor(props) {
        super(props);

        this.state = {
            authState: 'unknown'
        };
    }

    /**
     * React API - componentWillMount() is called right before the component
     * is added to the DOM
     * @returns {void}
     */
    componentWillMount() {
        this.authStoreID = authStore.addStoreListener(() => {
            this.updateState();
        });
        this.updateState();
    }

    /**
     * React API - componentWillUnmount() is called right before the component
     * is removed from the DOM
     * @returns {void}
     */
    componentWillUnmount() {
        authStore.removeStoreListener(this.authStoreID);
    }

    /**
     * Read the state and set the state according to the auth store
     * @returns {void}
     */
    updateState() {
        this.setState({
            authState: authStore.state
        });
    }

    /**
     * React API - render() method
     * Renders the login menu option
     * @returns {JSX.Element} a JSX Expression
     */
    render() {
        /* eslint-disable no-multi-spaces */
        let stateInfo = {
            unknown:       { icon: 'link-off', title: ''       },
            init:          { icon: 'link',     title: ''       },
            anonymous:     { icon: 'login',    title: 'Login'  },
            authenticated: { icon: 'logout',   title: 'Logout' }
        };
        /* eslint-enable no-multi-spaces */
        let icon = stateInfo[this.state.authState].icon;
        let title = stateInfo[this.state.authState].title;

        return <MenuElement menu={this.props.menu} icon={icon} title={title}/>;
    }
}
