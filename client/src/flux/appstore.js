import fetch from 'isomorphic-fetch';
import localforage from 'localforage';

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
        super('App');

        this.logger.entry('constructor-AppStore');

        this.logger.debug('Setting initial data set');
        this.data = {
            errorMessage: null,
            authPhase: 'initializing',
            authConfig: { clientid: null, domain: null },
            currentUser: null
        };
        this.logger.debug('this.data = ', this.data);

        this.logger.trace('Setting dispatch table');
        this.dispatchTable = {
            'init-appstore': (payload) => {
                return this.initializeStore(payload);
            },
            'authenticate': (payload) => {
                return this.authenticate(payload);
            },
            'check-cached-authentication': (payload) => {
                return this.checkCachedAuthentication(payload);
            }
        };
        this.logger.debug('this.dispatchTable = ', this.dispatchTable);

        this.logger.debug('Dispatching init-appstore action');
        dispatcher.dispatch({ actionType: 'init-appstore' });

        this.logger.exit('constructor-AppStore');
    }

    /**
     * Event handler for the dispatched actions
     * @param {Object} action the dispatched action
     * @param {string} action.actionType the type of action
     * @returns {bool} true if this action was handled
     * @overrides Store#onAction
     */
    onAction(action) {
        this.logger.entry('onAction', { action: action });
        if (action.actionType) {
            if (typeof this.dispatchTable[action.actionType] === 'function') {
                this.logger.debug(`Dispatching action ${action.actionType}`);
                let returns = this.dispatchTable[action.actionType](action);
                this.logger.exit('onAction', returns);
                return returns;
            }
            this.logger.debug(`Ignoring action ${action.actionType} - no dispatch table`);
        } else {
            this.logger.debug(`Ignoring action - no actionType`);
        }
        this.logger.exit('onAction', false);
        return false;
    }

    /**
     * Event Handler for the init-appstore action
     * @returns {bool} true if this action was handled
     */
    initializeStore() {
        this.logger.entry('initializeStore');

        this.logger.debug('initalizeStore: Calling API: GET /config/auth');
        fetch('/config/auth')
            .then((response) => {
                this.logger.debug('initializeStore: Response = ', response);
                if (!response.ok) {
                    this.logger.debug('initializeStore: Error received - changing store');
                    let errmsg = `Error retrieving /config/auth: ${response.statusText}`;
                    this.data.errorMessage = errmsg;
                    this.data.authPhase = 'error';
                    this.storeChanged();
                    return null;
                }
                this.logger.debug('initializeStore: Converstion to JSON');
                return response.json();
            })
            .then((config) => {
                this.logger.debug('initializeStore: config = ', config);
                if (config) {
                    if (config.clientid === 'NOT-SET') {
                        this.logger.debug('initializeStore: config is bad - sending error to store');
                        this.data.errorMessage = `ClientId stored in server is not set`;
                        this.data.authPhase = 'error';
                        this.storeChanged();
                        return null;
                    }
                    this.logger.debug('initializeStore: config received - changing store');
                    this.data.authConfig = config;
                    this.data.authPhase = 'anonymous';
                    this.storeChanged();

                    // Send the check-cached-authentication action
                    dispatcher.dispatch({ actionType: 'check-cached-authentication' });
                }
            });

        this.logger.exit('initializeStore', true);
        return true;
    }

    /**
     * Event Handler for authentication events
     * @param {Object} payload the action payload
     * @param {string} payload.token the IdP token
     * @param {Object} payload.profile the user profile
     * @returns {bool} true if this action was handled
     */
    authenticate(payload) {
        this.logger.entry('authenticate', payload);

        if (payload.token && payload.profile) {
            if (typeof payload.token !== 'string') {
                this.logger.error('payload.token is not a string');
                return false;
            }
            if (!payload.profile.name) {
                this.logger.error('payload.profile.name does not exist');
                return false;
            }
            this.data.currentUser = {
                token: payload.token,
                profile: payload.profile
            };
            this.data.authPhase = 'authenticated';

            localforage.setItem('gw-authentication', {
                clientid: this.data.authConfig.clientid,
                domain: this.data.authConfig.domain,
                profile: JSON.stringify(this.data.currentUser.profile),
                token: this.data.currentUser.token
            });

            this.storeChanged();
        } else {
            this.logger.error('Invalid payload for authenticate action');
        }

        this.logger.exit('authenticate', true);
        return true;
    }

    /**
     * Event Handler for authentication events
     * @returns {bool} true if this action was handled
     */
    checkCachedAuthentication() {
        this.logger.entry('checkCachedAuthentication');

        localforage.getItem('gw-authentication')
            .then((authInfo) => {
                this.logger.debug('[checkCachedAuthentication-callback] authInfo = ', authInfo);
                if (authInfo.clientid && authInfo.domain) {
                    if (this.data.authConfig.clientid !== authInfo.clientid || this.data.authConfig.domain !== authInfo.domain) {
                        throw new Error('stored config does not match current config');
                    }
                } else {
                    throw new Error('stored config does not include auth config');
                }

                if (authInfo.token && authInfo.profile) {
                    let headers = new Headers();
                    headers.append('Authorization', `Bearer ${authInfo.token}`);
                    fetch('/auth/verify', { headers: headers })
                        .then((response) => {
                            // If response === 200, then we have a valid token
                            // so send an authenticate response
                            this.logger.debug('/auth/verify response: ', response);
                            if (response.status === 200) {
                                this.logger.info('Authentication still valid - authenticating');
                                dispatcher.dispatch({
                                    actionType: 'authenticate',
                                    profile: JSON.parse(authInfo.profile),
                                    token: authInfo.token
                                });
                            }
                        })
                        .catch((err) => {
                            this.logger.info('/auth/verify error: ', err);
                        });
                } else {
                    throw new Error('stored config does not include user information');
                }
            })
            .catch((err) => {
                this.logger.error('[checkCachedAuthentication-callback] err = ', err);
                return false;
            });

        this.logger.exit('checkCachedAuthentication', true);
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
