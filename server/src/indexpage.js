import config from 'config';

let cssLink = config.env === 'development' ? '' : '<link rel="stylesheet" href="grumpywizards.css">';

const index = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Grumpy Wizards</title>
    ${cssLink}
</head>
<body>
    <div id="jsx-page"></div>

    <script src="//cdnjs.cloudflare.com/ajax/libs/core-js/2.0.2/core.min.js"></script>
    <script src="//fb.me/react-0.14.4.min.js"></script>
    <script src="//fb.me/react-dom-0.14.4.min.js"></script>
    <script src="grumpywizards.js"></script>
</body>
</html>
`;

/**
 * Display a HTML page.  Only include the stylesheet link in production
 * @param {express.Request} request the Express Request
 * @param {express.Response} response the Express Response
 * @returns {void
 */
function indexPageRouter(request, response) {
    response.status(200).type('text/html').send(index);
}

export default indexPageRouter;
