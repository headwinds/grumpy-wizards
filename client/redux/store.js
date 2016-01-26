import { createStore } from 'redux';
import { requestAuthInfo } from './actions';
import reducer from './reducers';

const initialState = {
    phase: 'pending',
    user: null,
    error: null
};

let store = createStore(reducer, initialState);

// Dispatch the initial action
let requestAction = requestAuthInfo();
requestAction(store.dispatch);

export default store;
