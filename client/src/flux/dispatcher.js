import { Dispatcher } from 'flux';
import ClientLogger from './logger';

let dispatcher = new Dispatcher();

// Log all dispatched actions
let logger = new ClientLogger('dispatcher');
dispatcher.register((payload) => {
    logger.trace('action dispatched: ', payload);
});

export default dispatcher;
