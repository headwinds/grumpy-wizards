import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { createHistory } from 'history';
import { syncHistory, routeReducer } from 'react-router-redux';

import { requestAuthInfo } from './actions/auth';
import * as reducers from './reducers';

// Combine the reducers for the store
const appReducers = combineReducers({
    ...reducers,
    routing: routeReducer
});

// Move the react-router stuff into Redux
export const history = createHistory();
const reduxRouterMiddleware = syncHistory(history);

// Apply all the middleware for Redux
const reduxStore = applyMiddleware(
    reduxRouterMiddleware,
    thunkMiddleware,
    promiseMiddleware,
    createLogger()
)(createStore);

// Create the Redux Store
export const store = reduxStore(appReducers);
reduxRouterMiddleware.listenForReplays(store);

// Dispatch the initial action
store.dispatch(requestAuthInfo());
