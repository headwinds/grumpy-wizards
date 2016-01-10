import Auth0Lock from 'auth0-lock';
import React from 'react';
import ClientLogger from '../flux/logger';
import appStore from '../flux/appstore';

let logger = new ClientLogger('Authenticator.jsx');

require('./Authenticator.scss');

/**
 * Provide an Auth0 login/logout capability based on the AppStore
 * @extends React.Component
 */
export default class Authenticator extends React.Component {
    /**
     * Invoked once before the component is mounted for the first time
     * @returns {Object} the initial state
     */
    getInitialState() {
        logger.entry('getInitialState');
        let initialState = {
            authPhase: 'unknown',
            authConfig: null
        };
        logger.exit('getInitialState', initialState);
    }

    /**
     * Invoked immediately before the initial rendering of the component
     * @returns {void}
     */
    componentWillMount() {
        logger.entry('componentWillMount');

        logger.debug('registering view with AppStore');
        this.storeid = appStore.addStoreListener(() => {
            logger.trace('AppStore has updated - updating state');
            this.updateState();
        });
        logger.debug('store ID = ', this.storeid);
        this.updateState();
        logger.exit('componentWillMount');
    }

    /**
     * Invoked immediately before a component is unmounted from the DOM
     * @returns {void}
     */
    componentWillUnmount() {
        logger.entry('componentWillUnmount');
        appStore.removeStoreListener(this.storeid);
        logger.exit('componentWillUnmount');
    }

    /**
     * Private method to update the state of this component from the
     * application store.
     * @returns {void}
     */
    updateState() {
        logger.entry('updateState');

        let newState = {
            authPhase: appStore.authenticationPhase,
            authConfig: appStore.authenticationConfig
        };
        logger.debug('updateState: new state = ', newState);
        this.setState(newState);

        logger.exit('updateState');
    }

    /**
     * Event handler called when the user clicks on the login icon
     * @param {Event} event the synthetic event from react
     * @returns {bool} true if the event was handled
     */
    onLoginClicked(event) {
        logger.entry('onLoginClicked', { event: event });
        event.preventDefault();

        if (!this.lock) {
            this.lock = new Auth0Lock(
                this.state.authConfig.clientId,
                this.state.authConfig.clientDomain);
            this.lockIsOpen = false;
        }

        if (this.lockIsOpen) {
            logger.debug('Lock is already open - bailing');
            return false;
        }

        let lockOptions = {
            closable: true,
            disableSignupAction: true,
            focusInput: true,
            popup: true,
            rememberLastLogin: true,
            responseType: 'token',
            socialBigButtons: false
        };

        this.lockIsOpen = true;
        logger.trace('Opening Auth0 Lock');
        this.lock.show(lockOptions, (err, profile, token) => {
            logger.trace('Lock: callback =', err, profile, token);
            this.lockIsOpen = false;
            this.lock.hide();
            if (err) {
                logger.error('Auth0 Error: ', err);
                return;
            }
            logger.debug('Auth0: Profile = ', profile);
            logger.debug('Auth0: Token = ', token);
            return;
        });

        logger.exit('onLoginClicked');
        return true;
    }

    /**
    * Render the component
    *
    * @returns {JSX.Element} the JSX Rendering of this component
    * @overrides React.Component#render
    */
    render() {
        logger.entry('render');
        logger.debug('Current state = ', this.state);

        let iconmap = {
            unknown: 'mdi mdi-help-circle',
            error: 'mdi mdi-alert-outline',
            initializing: 'fa fa-spinner fa-pulse',
            anonymous: 'mdi mdi-login'
        };

        if (this.state.authPhase in iconmap) {
            logger.debug(`Rendering ${this.state.authPhase} = ${iconmap[this.state.authPhase]}`);

            let liclass = `authenticator--icon-${this.state.authPhase}`;
            let iconclass = iconmap[this.state.authPhase];
            let icon = <li className={liclass}><span className={iconclass}></span></li>;

            if (this.state.authPhase === 'anonymous') {
                let loginHandler = (event) => {
                    return this.onLoginClicked(event);
                };
                icon = <li className={liclass} onClick={loginHandler}><span className={iconclass}></span></li>;
            }

            let jsx = <div className="authenticator"><ul>{icon}</ul></div>;
            logger.exit('render');
            return jsx;
        }

        logger.debug('Unknown authPhase: ', this.state.authPhase);
        logger.exit('render');
        return <div className="authenticator">{'ERROR!'}</div>;
    }
}
