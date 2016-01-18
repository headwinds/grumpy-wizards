import fetch from 'isomorphic-fetch';
import dispatcher from './dispatcher';
import Store from './store';

/**
 * Application Store (flux pattern)
 * @extends Store
 */
class AppStore extends Store {
    /**
     * Create a new appstore object.  This is a flux object
     * @returns {void}
     */
    constructor() {
        super('app-store');

        this.logger.entry('$constructor');

        // Establish a data block
        this.storeData = {
            auth: {
                token: null
            },
            config: null,
            error: false
        };

        // List of endpoints we use
        this.endpoints = {
            config: '/api/config'
        };

        this.logger.debug('document.location = ', document.location);

        // Register any action listeners
        this.logger.debug('Creating Dispatch Table');
        this.onActionDispatched('init-store', (payload) => {
            this.initializeStore(payload);
        });

        // Dispatch the action to initialize the store
        this.logger.debug('Dispatching Store Initializer');
        dispatcher.dispatch({
            actionType: 'init-store'
        });

        this.logger.exit('$constructor');
    }

    /**
     * Action Handler for the init-store event
     * @param {Object} payload the payload provided to the dispatcher
     * @returns {boolean} true if the payload was handled
     */
    initializeStore(payload) {
        this.logger.entry('initializeStore', payload);

        this.logger.debug(`Initiating fetch of ${this.endpoints.config}`);
        let options = {
            method: 'GET',
            credentials: 'omit',
            cache: 'no-cache'
        };
        fetch(this.endpoints.config, options).then((response) => {
            this.logger.debug('[fetch-callback-1]: Response = ', response);
            if (!response.ok) {
                this.logger.error(`[fetch-callback-1] response = ${response.status} ${response.statusText}`);
                throw new Error('Invalid Response from Config Endpoint', response);
            }
            return response.json();
        }).then((config) => {
            this.logger.debug('[fetch-callback-2]: config = ', config);
            this.storeData.config = Object.assign({}, config);
            this.storeData.error = false;
            this.storeChanged();
        }).catch((error) => {
            this.logger.error(`[fetch-callback-catch] failed to gather config information`);
            this.storeData.error = { message: error.message };
            this.storeChanged();
        });

        return this.logger.exit('initializeStore', true);
    }

    /**
     * Is the user authenticated?
     * @type {boolean}
     * @readonly
     */
    get isAuthenticated() {
        return this.storeData.auth.token !== null;
    }

    /**
     * Get any error message from the server
     * @type {boolean|string}
     * @readonly
     */
    get errorMessage() {
        if (this.storeData.error)
            return this.storeData.error.message;
        return false;
    }
}

// singleton pattern - only one import please
let appStore = new AppStore();
export default appStore;
