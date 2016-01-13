import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Chrome from './components/Chrome.jsx';
import ClientLogger from './lib/logger';

require('./app.scss');

let logger = new ClientLogger(__filename);
logger.info('Booting Application');

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Chrome}>
        </Route>
    </Router>,
    document.getElementById('jsx-page')
);
