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

        // Register any action listeners
        this.logger.debug('Creating Dispatch Table');
        this.onActionDispatched('init-store', (payload) => { this.initializeStore(payload); });
        this.onActionDispatched('check-auth', (payload) => { this.checkAuthentication(payload); });

        // Dispatch initial actions
        this.logger.debug('Dispatching Store Initializer');
        dispatcher.dispatch({ actionType: 'init-store' });

        this.logger.exit('$constructor');
    }

    /**
     * Action Handler for the init-store event
     * @param {Object} payload the payload provided to the dispatcher
     * @returns {boolean} true if the payload was handled
     */
    initializeStore(payload) {
        this.logger.entry('initializeStore', payload);

        const endpoint = '/api/config';
        this.logger.debug(`Initiating fetch of ${endpoint}`);
        let options = {
            method: 'GET',
            credentials: 'omit',
            cache: 'no-cache'
        };

        // Fetch the authentication configuration
        fetch(endpoint, options).then((response) => {
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

            // Dispatch the action to check if we are authenticated
            dispatcher.dispatch({ actionType: 'check-auth' });
        }).catch((error) => {
            this.logger.error(`[fetch-callback-catch] failed to gather config information`);
            this.storeData.error = { message: error.message };
            this.storeChanged();
        });

        return this.logger.exit('initializeStore', true);
    }

    /**
     * Action Handler for the check-auth event
     * @param {Object} payload the payload provided to the dispatcher
     * @returns {boolean} true if the payload was handled
     */
    checkAuthentication(payload) {
        this.logger.entry('checkAuthentication', payload);

        let endpoint = this.storeData.auth.endpoint.details;
        this.logger.debug(`Initiating fetch of ${endpoint}`);
        let options = {
            method: 'GET',
            credentials: 'include',
            cache: 'no-cache'
        };

        // Fetch the authentication configuration
        fetch(endpoint, options).then((response) => {
            this.logger.debug('[checkauth-callback-1]: Response = ', response);
            if (!response.ok && response.status !== 401)
                throw new Error('Invalid Response from Auth Endpoint', response);
            if (response.status === 401)
                return false;
            return response.json();
        }).then((auth) => {
            if (!auth) {
                this.logger.info('[checkauth-callback-2] unauthenticated');
                this.storeData.auth = { token: null };
                this.storeChanged();
                return;
            }
            this.logger.debug('[checkauth-callback-2]: auth = ', auth);

            /**
             * Map/Reduce mapper for dealing with claims
             * @param {object} target the target object
             * @param {object} claim each individual claim
             * @returns {object} the target
             */
            function mapClaims(target, claim) {
                target[claim.typ] = claim.val;
                if (claim.typ.indexOf('http://schemas.xmlsoap.org/ws') !== -1)
                    target[claim.typ.slice(claim.typ.lastIndexOf('/') + 1)] = claim.val;
                return target;
            }

            let providerData = auth[0];
            this.storeData.auth = {
                claims: providerData.user_claims.reduce(mapClaims, {}),
                id: providerData.user_id,
                provider: providerData.provider_name,
                token: providerData.access_token,
                providertoken: providerData.authentication_token
            };
            this.logger.debug('[checkauth-callback-2]: authdata = ', this.storeData.auth);

            this.storeData.error = false;
            this.storeChanged();
        }).catch((error) => {
            this.logger.error(`[checkauth-callback-catch] failed to check authentication status`);
            this.storeData.error = { message: error.message };
            this.storeChanged();
        });

        return this.logger.exit('checkAuthentication', true);
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

    /**
     * Returns the authentication endpoint
     * @type {string}
     * @readonly
     */
    get authenticationEndpoint() {
        if (this.storeData.config)
            return this.storeData.config.auth.endpoint;
        return false;
    }

    /**
     * Returns the authentication information block
     * @type {object}
     * @readonly
     */
    get authenticationInformation() {
        if (this.isAuthenticated)
            return this.storeData.auth;
        return false;
    }
}

// singleton pattern - only one import please
let appStore = new AppStore();
export default appStore;
