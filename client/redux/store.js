import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { requestAuthInfo } from './actions/auth';
import * as reducers from './reducers';

// Combine the reducers for the store
const appReducers = combineReducers(Object.assign({},
    reducers
));

// Apply all the middleware for Redux
const reduxStore = applyMiddleware(
    thunkMiddleware,
    promiseMiddleware,
    createLogger()
)(createStore);

// Create the Redux Store
const store = reduxStore(appReducers);

// Dispatch the initial action
store.dispatch(requestAuthInfo());

export default store;
