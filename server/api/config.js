var config = require('config');

// Define the API
var api = {
    /**
     * Handler for GET /api/config
     * Returns the JSON client configuration
     * @param {express.Request} request the ExpressJS Request object
     * @param {express.Response} response the ExpressJS Response object
     * @returns {express.Response} response the result of the operation
     */
    get: (request, response) => {
        var clientConfiguration = {
            env: config.get('env'),
            base: config.get('base')
        };
        return response
            .status(200)
            .type('application/json')
            .send(clientConfiguration);
    }
};

// Specify options to the API
api.get.access = 'anonymous';

// Export the API
module.exports = api;
