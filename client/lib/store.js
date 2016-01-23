import ClientLogger from './logger';
import dispatcher from './dispatcher';
import EventEmitter from 'events';
import uuid from 'uuid';

let logger = new ClientLogger('lib/store.js');

/**
 * Create a Flux Store
 *
 * @extends events#EventEmitter
 */
export default class Store extends EventEmitter {
    /**
     * Create a new store.  The store must have a name
     *
     * @param {string} name the name of the store
     * @returns {void}
     */
    constructor(name) {
        logger.entry('$constructor', name);
        super();

        logger.debug('Setting up private state');
        this.name = name;
        this.views = new Map();
        this.dispatchTable = new Map();
        this.prvState = {};

        logger.debug('Registering store with dispatcher');
        dispatcher.register((payload) => {
            return this.onActionDispatched(payload);
        });

        logger.debug('Listening for store-changed events');
        this.on('store-changed', this.onStoreChanged.bind(this));

        logger.exit('$constructor');
    }

    /**
     * Event handler that receives a dispatched action and acts
     * on it.
     *
     * @param {Object} payload the action payload
     * @param {string} payload.actionType the type of action
     * @throws {Error} if the actionType is not specified
     * @returns {bool} true if the action was handled by the store
     * @private
     */
    onActionDispatched(payload) {
        logger.entry('onActionDispatched', payload);

        // If the payload does not have an actionType, it's an error
        if (typeof payload.actionType !== 'string') {
            logger.error('Invalid Action: no actionType property');
            throw new Error('Invalid Action: no actionType property');
        }

        // Check to see if this store actually handles the payload
        if (!this.dispatchTable.has(payload.actionType)) {
            logger.warn(`Invalid Action: actionType ${payload.actionType} is not registered with store ${this.name}`);
            return false;
        }

        // Dispatch the action to a specific action handler within the store
        logger.info(`Dispatching actionType ${payload.actionType} to store ${this.name}`);
        return logger.exit('onActionDispatched', this.dispatchTable.get(payload.actionType)(payload));
    }

    /**
     * Add an action handler for a specific action.
     *
     * @param {string} action the name of the action
     * @param {Function} callback the function that handles the action
     * @throws {Error} if the dispatch table already has a handler defined
     * @returns {void}
     */
    addActionDispatcher(action, callback) {
        logger.entry('addActionDispatcher', action);
        if (this.dispatchTable.has(action)) {
            logger.error(`Duplicate Action Dispatcher for actionType=${action}`);
            throw new Error('Duplicate Action Dispatcher for actionType:', action);
        }
        logger.info(`Registering action dispatcher for actionType=${action}`);
        this.dispatchTable.set(action, callback);
    }

    /**
     * Add a store listener - generally called from a Controller-View
     * in the componentWillMount() method
     *
     * @param {Function} callback the function to call when the store changes
     * @param {bool} [callnow=true] call the callback immediately?
     * @returns {string} an opaque value for deregistering the store listener
     */
    addStoreListener(callback, callnow = true) {
        logger.entry('addStoreListener');
        let id = uuid.v4();
        this.views.set(id, callback);
        if (callnow) {
            logger.debug('Calling callback immediately');
            callback(); // eslint-disable-line callback-return
        }
        return logger.exit('addStoreListener', id);
    }

    /**
     * Removes a store listener - generally called from a Controller-View
     * in the componentWillUnmount() method
     *
     * @param {string} id the opaque value received from addStoreListener()
     * @throws {Error} if the controller-view id does not exist
     * @returns {void}
     */
    removeStoreListener(id) {
        logger.entry('removeStoreListener', id);
        if (!this.views.has(id)) {
            logger.error('Invalid Controller-View id:', id);
            throw new Error('Invalid Controller-View id:', id);
        }
        this.views.delete(id);
        logger.exit('removeStoreListener');
    }

    /**
     * Event emitter that emits a store-changed event
     *
     * @returns {void}
     * @private
     */
    storeChanged() {
        logger.entry('storeChanged');
        this.emit('store-changed');
        logger.exit('storeChanged');
    }

    /**
     * Event receiver for the store-changed event - calls each controller-view
     * in turn to update state
     *
     * @returns {void}
     */
    onStoreChanged() {
        logger.entry('onStoreChanged');
        for (let [ id, callback ] of this.views) {
            logger.debug(`Dispatching store-changed to ID=${id}`);
            callback(); // eslint-disable-line callback-return
        }
        logger.exit('onStoreChanged');
    }

    /**
     * Merge the new state with the old state to over-write any new data
     *
     * @param {Object} newState the new values for the store state
     * @param {bool} [updateStore=true] set to false to prevent a storeChanged event
     * @returns {Object} the new state
     */
    setState(newState, updateStore = true) {
        logger.entry('setState', newState);
        logger.info(`[Store ${this.name}] Old State:`, this.state); // eslint-disable-line no-console
        this.prvState = Object.assign(this.prvState, newState);
        logger.info(`[Store ${this.name}] New State:`, this.state); // eslint-disable-line no-console
        if (updateStore)
            this.storeChanged();
        return logger.exit('setState', this.state);
    }

    /**
     * The store state
     *
     * @type {Object}
     * @readonly
     */
    get state() {
        return this.prvState;
    }
}
