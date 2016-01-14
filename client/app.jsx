import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Chrome from './components/Chrome.jsx';
import ClientLogger from './lib/logger';

require('./app.scss');

let logger = new ClientLogger(__filename);
logger.info('Booting Application');

// support tap events
injectTapEventPlugin();

// render the page
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Chrome}>
        </Route>
    </Router>,
    document.getElementById('jsx-page')
);
