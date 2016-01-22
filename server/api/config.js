import config from 'config';

/**
 * Handler for GET /api/config
 * Returns the JSON client configuration
 * @param {express.Request} request the ExpressJS Request object
 * @param {express.Response} response the ExpressJS Response object
 * @returns {express.Response} response the result of the operation
 */
function getConfiguration(request, response) {
    let clientConfiguration = {
        env: config.get('env'),
        base: config.get('base')
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
