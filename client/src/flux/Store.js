import dispatcher from './dispatcher';
import ClientLogger from './logger';
import EventEmitter from 'events';
import uuid from 'uuid';

/**
 * A partial implementation of a Flux Store
 * @extends EventEmitter
 */
export default class Store extends EventEmitter {
    /**
     * Create a new store.
     * @param {string} name the name of the store
     * @returns {void}
     */
    constructor(name) {
        super();

        this.name = name;
        this.logger = new ClientLogger(`Store-${name}`);
        this.stores = new Map();

        this.logger.entry('constructor-Store', { name: name });
        this.logger.trace('Registering onAction with dispatcher');
        dispatcher.register((payload) => {
            return this.onAction(payload);
        });

        this.logger.trace('Registering onStoreChanged for store-changed events');
        this.on('store-changed', this.onStoreChanged.bind(this));

        this.logger.exit('constructor-Store');
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
        this.logger.entry('addStoreListener', { callback: callback });
        let id = uuid.v4();
        this.stores.set(id, callback);
        this.logger.trace('addStoreListener: stores=', this.stores);
        this.logger.exit('addStoreListener', id);
        return id;
    }

    /**
     * Remove a store listener
     * @param {string} id provided by addStoreListener
     * @returns {void}
     */
    removeStoreListener(id) {
        this.logger.entry('removeStoreListener', { id: id });
        if (this.stores.has(id)) {
            this.logger.debug(`removeStoreListener: found id ${id} - deleting`);
            this.stores.delete(id);
        } else {
            this.logger.debug(`removeStoreListener: did not find id ${id}`);
        }
        this.logger.trace('removeStoreListener: stores=', this.stores);
        this.logger.exit('removeStoreListener');
    }

    /**
     * Emit a store changed event
     * @returns {void}
     */
    storeChanged() {
        this.logger.entry('storeChanged');
        this.emit('store-changed');
        this.logger.exit('storeChanged');
    }

    /**
     * Event handler for the store changed event - calls each listener in turn
     * @returns {void}
     */
    onStoreChanged() {
        this.logger.entry('onStoreChanged');
        for (let [ id, storeHandler ] of this.stores) {
            this.logger.trace('Executing callback for view ', id);
            storeHandler();
        }
        this.logger.exit('onStoreChanged');
    }
}
