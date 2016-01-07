import Store from './Store';

/**
 * Flux store for holding authentication data
 * @extends Store
 */
class AuthStore extends Store {
    /**
     * Creates a new AuthStore
     * @returns {void}
     */
    constructor() {
        super();

        this.data = {
            state: 'init'
        };
    }

    /**
     * Event handler for the dispatched actions
     * @param {Object} payload the dispatched action
     * @param {string} payload.actionType the type of action
     * @returns {bool} true if this action was handled
     * @overrides Store#onAction
     */
    onAction(payload) {
        console.log('[AuthStore] onAction: ', payload); // eslint-disable-line no-console
        return false;
    }

    /**
     * Get the authentication state
     * @type {string}
     * @readonly
     */
    get state() {
        return this.data.state;
    }
}

export default new AuthStore();
