import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { StyleRoot } from 'radium';
import AppRoutes from './pages';
import { store, history } from './redux/store';

// Needed for onTouchTap - Can go away when react 1.0 release
// Check this repo: https://github.com/zilverline/react-tap-event-plugin
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

let onUpdate = () => { window.scrollTo(0, 0); };

// render the page
ReactDOM.render(
    <Provider store={store}>
        <StyleRoot style={pageStyle}>
            <Router history={history} onUpdate={onUpdate}>
                {AppRoutes}
            </Router>
        </StyleRoot>
    </Provider>,
    document.getElementById('pageview')
);
