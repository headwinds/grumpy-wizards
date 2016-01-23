import ClientLogger from '../lib/logger';
import dispatcher from '../lib/dispatcher';
import fetch from 'isomorphic-fetch';
import Store from '../lib/store';

let logger = new ClientLogger('stores/auth-store.js');
/**
 * Authentication Store (Flux Store Implementation)
 *
 * @extends Store
 */
class AuthStore extends Store {
    /**
     * Create a new authentication store and register for action
     * listeners.
     *
     * @returns {void}
     */
    constructor() {
        super('AuthStore');

        logger.entry('$constructor');

        logger.debug('Setting initial State');
        this.setState({
            accessToken: null,
            authState: 'pending',
            claims: null,
            errorMessage: '',
            id: null,
            provider: 'unknown',
            providerToken: null
        });

        logger.debug('Adding action dispatchers');
        this.addActionDispatcher('request-auth-info', (payload) => {
            this.requestAuthenticationInformation(payload);
        });

        this.addActionDispatcher('receive-auth-info', (payload) => {
            this.receiveAuthenticationInformation(payload);
        });

        logger.debug('Initializing baseUrl');
        this.baseUrl = '';
        if (window.GRUMPYWIZARDS && window.GRUMPYWIZARDS.base)
            this.baseUrl = window.GRUMPYWIZARDS.base.replace(/\/$/, '');
        logger.debug(`BaseURL = ${this.baseUrl}`);

        logger.debug('Dispatching request-auth-info');
        dispatcher.dispatch({ actionType: 'request-auth-info' });
        logger.exit('$constructor');
    }

    /**
     * Action Handler: Request Authentication Information (async net request)
     *
     * @returns {bool} true if the action was handled
     */
    requestAuthenticationInformation() {
        logger.entry('requestAuthenticationInformation');
        const authUrl = `${this.baseUrl}/.auth/me`;
        const authOptions = { method: 'GET', credentials: 'include', cache: 'no-cache', mode: 'cors' };

        logger.debug(`fetch ${authUrl},`, authOptions);
        fetch(authUrl, authOptions)
        .then((response) => {
            logger.entry('fetch-then-response', response);
            if (!response.ok && response.status !== 401)
                throw new Error(`Invalid Response from ${authUrl}:`, response);
            if (response.status === 401)
                return new Promise((resolve) => { resolve(false); });
            return response.json();
        })
        .then((authData) => {
            logger.entry('fetch-then-authdata', authData);
            let authInfo = {
                actionType: 'receive-auth-info',
                state: 'anonymous'
            };
            if (authData && Array.isArray(authData) && authData.length > 0) {
                authInfo.state = 'authenticated';
                authInfo.data = authData[0];
            }
            logger.debug('Dispatching action:', authInfo);
            return dispatcher.dispatch(authInfo);
        })
        .catch((error) => {
            logger.error('fetch-catch', error);
            return dispatcher.dispatch({
                actionType: 'receive-auth-info',
                state: 'error',
                error: 'Network Error while receiving authentication state'
            });
        });
        return logger.exit('requestAuthenticationInformation', true);
    }

    /**
     * Action Handler: Receive Authentication Information (async net request)
     *
     * @param {Object} payload the authentication information
     * @param {string} payload.state the state of the authentication
     * @param {string} [payload.access_token] the ZUMO token
     * @param {Object} [payload.user_claims] the claims from the IdP
     * @param {string} [payload.error] the error message (if any)
     * @param {string} [payload.user_id] the user id
     * @param {string} [payload.provider] the provider name
     * @param {string} [payload.provider_token] the provider access token
     * @returns {bool} true if the action was handled
     */
    receiveAuthenticationInformation(payload) {
        logger.entry('receiveAuthenticationInformation', payload);
        if (typeof payload.state !== 'string') {
            logger.error('receive-auth-info: Invalid payload (state !== string)');
            throw new Error('receive-auth-info: Invalid payload');
        }

        let claims = null;
        if (payload.user_claims) {
            // Convert the user claims into something useful
            claims = payload.user_claims.reduce((target, claim) => {
                target[claim.typ] = claim.val;
                if (claim.typ.indexOf('http://schemas.xmlsoap.org/ws') !== -1)
                    target[claim.typ.slice(claim.typ.lastIndexOf('/') + 1)] = claim.val;
                return target;
            }, {});
        }
        logger.debug('authInfo claims=', claims);

        this.setState({
            accessToken: payload.access_token || null,
            authState: payload.state,
            claims: claims,
            errorMessage: payload.error || '',
            id: payload.user_id || null,
            provider: payload.provider_name || 'unknown',
            providerToken: payload.provider_token || null
        });
        return logger.exit('receiveAuthenticationInformation', true);
    }

    /**
     * The ZUMO access token (or null if not available)
     *
     * @type {string}
     * @readonly
     */
    get accessToken() {
        return this.state.accessToken;
    }

    /**
     * The authentication state (one of pending, anonymous, authentication, error)
     *
     * @type {string}
     * @readonly
     */
    get authState() {
        return this.state.authState;
    }

    /**
     * The authentication claims (kv-pairs)
     *
     * @type {Object}
     * @readonly
     */
    get authClaims() {
        return this.state.claims;
    }

    /**
     * The error message (if authState === error)
     *
     * @type {string}
     * @readonly
     */
    get errorMessage() {
        return this.state.errorMessage;
    }

    /**
     * The IdP User ID (do not use this if possible)
     *
     * @type {string}
     * @readonly
     */
    get userId() {
        return this.state.id;
    }

    /**
     * The authentication provider (aad, facebook, google, twitter, microsoftaccount)
     *
     * @type {string}
     * @readonly
     */
    get authProvider() {
        return this.state.provider;
    }

    /**
     * The token used to access the Id Provider
     *
     * @type {string}
     * @readonly
     */
    get idpToken() {
        return this.state.providerToken;
    }
}

export default new AuthStore();
