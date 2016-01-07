import React from 'react';

// Flux Stores
import authStore from '../flux/AuthStore';

// Components
import MenuElement from './MenuElement.jsx';

// Stylesheet
require('./Header.scss');

/**
 * Header Component
 * @extends React.Component
 */
export default class Header extends React.Component {
    /**
     * Create a new header object.
     * Recipe: Flux View-Component with linkage to AuthStore
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
     * Renders the header
     * @returns {JSX.Element} a JSX Expression
     */
    render() {
        let authBlock = {
            unknown: 'link-off',
            init: 'link',
            anonymous: 'login',
            authenticated: 'logout'
        };

        let brandBlock = <h1>{'Grumpy Wizards'}</h1>;
        let menuBlock = <div className="appmenu"><ul><li><MenuElement icon={authBlock[this.state.authState]}/></li></ul></div>;

        return (
            <div className="header">
                <div className="header--brand">{brandBlock}</div>
                <div className="header--menu">{menuBlock}</div>
            </div>
        );
    }
}
