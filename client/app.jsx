import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { createHistory } from 'history';
import { syncHistory, routeReducer } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { StyleRoot } from 'radium';

import { requestAuthInfo } from './redux/actions/auth';
import * as reducers from './redux/reducers';
import AppRoutes from './pages';

// Combine the reducers for the store
const appReducers = combineReducers({
    ...reducers,
    routing: routeReducer
});

// Move the react-router stuff into Redux
const history = createHistory();
const reduxRouterMiddleware = syncHistory(history);

// Apply all the middleware for Redux
const reduxStore = applyMiddleware(
    reduxRouterMiddleware,
    thunkMiddleware,
    promiseMiddleware,
    createLogger()
)(createStore);

// Create the Redux Store
const store = reduxStore(appReducers);
reduxRouterMiddleware.listenForReplays(store);

// Dispatch the initial action
store.dispatch(requestAuthInfo());

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
