import azureMobileApp from 'azure-mobile-apps';
import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import logCollector from 'express-winston';
import staticFiles from 'serve-static';
import logger from './logger';

const index = `<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Grumpy Wizards</title>

    <link rel="stylesheet" href="grumpywizards.css">
</head>

<body>
    <div id="rootelement"></div>

    <script src="//fb.me/react-0.14.4.min.js"></script>
    <script src="//fb.me/react-dom-0.14.4.min.js"></script>
    <script src="grumpywizards.js"></script>
</body>

</html>
`;

/**
 * Create an express web application and configure it.
 *
 * @param {boolean} [logging=true] - add transaction logging
 * @returns {Promise.<express>} A promisified express application
 */
function createWebApplication(logging = true) {
    let app = express(),
        mobile = azureMobileApp();

    if (typeof logging === 'undefined' || logging === true) {
        app.use(logCollector.logger({
            winstonInstance: logger,
            colorStatus: true,
            statusLevels: true
        }));
    }

    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Display the index.html file
    app.get('/', (request, response) => {
        response.status(200).type('text/html').send(index);
    });

    app.use(staticFiles('public', {
        dotfile: 'ignore',
        etag: true,
        index: false,
        lastModified: true
    }));

    mobile.tables.import('./tables');
    mobile.api.import('./api');

    return mobile.tables.initialize().then(() => {
        app.use(mobile);
        app.use(logCollector.errorLogger({ winstonInstance: logger }));
        return app;
    });
}

export default createWebApplication;
