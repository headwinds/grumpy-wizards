import { Dispatcher } from 'flux';
import ClientLogger from './logger';

let dispatcher = new Dispatcher();
let logger = new ClientLogger('lib/dispatcher.js');

dispatcher.register((payload) => {
    logger.info('Flux Action dispatched: ', payload); // eslint-disable-line no-console
});

export default dispatcher;
