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

        this.logger.entry('#constructor');

        // Establish a data block
        this.storeData = {
            auth: {
                token: null
            }
        };

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


        this.logger.exit('#constructor');
    }

    /**
     * Action Handler for the init-store event
     * @param {Object} payload the payload provided to the dispatcher
     * @returns {boolean} true if the payload was handled
     */
    initializeStore(payload) {
        this.logger.entry('initializeStore', payload);

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
}

// singleton pattern - only one import please
let appStore = new AppStore();
export default appStore;
