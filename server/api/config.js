import config from 'config';
import { logger } from '../logger';

/**
 * Handler for GET /api/config
 * Returns the JSON client configuration
 * @param {express.Request} request the ExpressJS Request object
 * @param {express.Response} response the ExpressJS Response object
 * @returns {express.Response} response the result of the operation
 */
function getConfiguration(request, response) {
    logger.trace('api/config.js#getConfiguration');

    let clientConfiguration = {
        auth: {
            endpoint: config.get('auth.endpoint')
        }
    };

    return response.status(200).type('application/json').send(clientConfiguration);
}

// Define the API
let api = {
    get: getConfiguration
};

// Specify options to the API
api.get.access = 'anonymous';

// Export the API
export default api;
