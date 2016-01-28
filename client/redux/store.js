import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { requestAuthInfo } from './actions';
import reducer from './reducers';

const initialState = {
    phase: 'pending',
    user: null,
    error: null,
    leftMenuVisibility: false
};

const loggerMiddleware = createLogger();
const reduxStore = applyMiddleware(
    thunkMiddleware,
    promiseMiddleware,
    loggerMiddleware
)(createStore);
const store = reduxStore(reducer, initialState);

// Dispatch the initial action
store.dispatch(requestAuthInfo());

export default store;
