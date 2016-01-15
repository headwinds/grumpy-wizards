import { StyleRoot } from 'radium';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Chrome from './components/Chrome.jsx';
import ClientLogger from './lib/logger';

let logger = new ClientLogger(__filename);
logger.info('Booting Application');

// support tap events
injectTapEventPlugin();

let pageStyle = {
    bottom: 0,
    left: 0,
    margin: 0,
    padding: 0,
    position: 'fixed',
    right: 0,
    top: 0
};

// render the page
ReactDOM.render(
    <StyleRoot style={pageStyle}>
        <Router history={browserHistory}>
            <Route path="/" component={Chrome}>
            </Route>
        </Router>
    </StyleRoot>,
    document.getElementById('jsx-page')
);
