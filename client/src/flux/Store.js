import dispatcher from './dispatcher';
import EventEmitter from 'events';
import uuid from 'uuid';

/**
 * A partial implementation of a Flux Store
 * @extends EventEmitter
 */
export default class Store extends EventEmitter {
    /**
     * Create a new store.
     * @returns {void}
     */
    constructor() {
        super();

        this.stores = new Map();

        // register this store with the dispatcher
        dispatcher.register((payload) => {
            return this.onAction(payload);
        });

        // register a handler for store change events
        this.on('store-changed', this.onStoreChanged.bind(this));
    }

    /**
     * Handler for the dispatched actions - this is normally
     * over-ridden.
     *
     * @param {Object} payload the dispatched payload
     * @param {string} payload.actionType the action type
     * @returns {bool} true if the payload was handled
     */
    onAction(payload) { // eslint-disable-line no-unused-vars
        throw new Error('You need to override the onAction method');
    }

    /**
     * Add a store listener
     * @param {function} callback the function to call when the store is changed
     * @returns {string} id for removing the store listener
     */
    addStoreListener(callback) {
        let id = uuid.v4();
        this.stores.set(id, callback);
        return id;
    }

    /**
     * Remove a store listener
     * @param {string} id provided by addStoreListener
     * @returns {void}
     */
    removeStoreListener(id) {
        delete this.stores[id];
    }

    /**
     * Emit a store changed event
     * @returns {void}
     */
    storeChanged() {
        this.emit('store-changed');
    }

    /**
     * Event handler for the store changed event - calls each listener in turn
     * @returns {void}
     */
    onStoreChanged() {
        for (let key in this.stores.keys()) {
            this.stores.get(key)();
        }
    }
}
