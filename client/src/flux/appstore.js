import fetch from 'isomorphic-fetch';

import dispatcher from './dispatcher';
import Store from './Store';

/**
 * Flux store for holding authentication data
 * @extends Store
 */
class AppStore extends Store {
    /**
     * Creates a new AuthStore
     * @returns {void}
     */
    constructor() {
        super();

        this.data = {
            errorMessage: null,
            authPhase: 'initializing',
            authConfig: { clientId: null, clientDomain: null },
            currentUser: null
        };

        this.dispatchTable = {
            'init-appstore': (payload) => {
                return this.initializeStore(payload);
            }
        };

        dispatcher.dispatch({ actionType: 'init-appstore' });
    }

    /**
     * Event handler for the dispatched actions
     * @param {Object} action the dispatched action
     * @param {string} action.actionType the type of action
     * @returns {bool} true if this action was handled
     * @overrides Store#onAction
     */
    onAction(action) {
        console.info('[AppStore] onAction:', action); // eslint-disable-line no-console
        if (action.actionType) {
            if (typeof this.dispatchTable[action.actionType] === 'function') {
                return this.dispatchTable[action.actionType](action);
            }
        }
        return false;
    }

    /**
     * Event Handler for the init-appstore action
     * @returns {bool} true if this action was handled
     */
    initializeStore() {
        fetch('/config/auth')
            .then((response) => {
                if (!response.ok) {
                    let errmsg = `Error retrieving /config/auth: ${response.statusText}`;
                    this.data.errorMessage = errmsg;
                    this.storeChanged();
                    return null;
                }
                return response.json();
            })
            .then((config) => {
                if (config) {
                    this.data.authConfig.clientId = config.clientid;
                    this.data.authConfig.clientDomain = config.domain;
                    this.data.authPhase = 'anonymous';
                    this.storeChanged();
                }
            });
        return true;
    }

    /**
     * Retrieve the error message (if any)
     * @type {string} errorMessage
     * @readonly
     */
    get errorMessage() {
        return this.data.errorMessage;
    }

    /**
     * Retrieve the authentication phase
     * @type {string} authenticationPhase
     * @readonly
     */
    get authenticationPhase() {
        return this.data.authPhase;
    }

    /**
     * Retrieve the authenitcation configuration
     * @type {Object} authenticationConfig
     * @type {string} authenticationConfig.clientId
     * @type {string} authenticationConfig.clientDomain
     * @readonly
     */
    get authenticationConfig() {
        return this.data.authConfig;
    }

    /**
     * The current user record
     * @type {Object} currentUser
     * @type {string} currentUser.token
     * @type {Object} currentUser.profile
     * @readonly
     */
    get currentUser() {
        return this.data.currentUser;
    }
}

export default new AppStore();
