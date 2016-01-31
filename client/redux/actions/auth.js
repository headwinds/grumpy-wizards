import fetch from 'isomorphic-fetch';
import settings from '../../settings';
import constants from '../constants';

/**
 * Redux Action Creator for handling anonymous response
 * @returns {Object} Redux Action
 */
function receiveAnonymousAuth() {
    return {
        type: constants.auth.setAnonymous
    };
}

/**
 * Redux Action Creator for handling authenticated response
 * @param {Array} response the response from the server
 * @returns {Object} Redux Action
 */
function receiveAuthenticatedAuth(response) {
    return {
        type: constants.auth.setAuthenticated,
        providerInfo: response[0]
    };
}

/**
 * Redux Action Creator for handling error conditions
 * @param {Error} error the error that happened
 * @returns {Object} Redux Action
 */
function receiveErrorCondition(error) {
    return {
        type: constants.auth.setError,
        error: error
    };
}

/**
 * Redux Action Creator for requesting authentication information
 * @returns {Function} A Promise dispatcher
 */
export function requestAuthInfo() {
    return (dispatch) => {
        let fetchOptions = {
            method: 'GET',
            credentials: 'include',
            cache: 'no-cache',
            mode: 'cors'
        };
        return fetch(`${settings.base}/.auth/me`, fetchOptions)
        .then((response) => {
            if (!response.ok && response.status !== 401)
                throw new Error(`Invalid Response from ${settings.base}/.auth/me:`, response);
            if (response.status === 401)
                return new Promise((resolve) => { resolve(false); });
            return response.json();
        })
        .then((response) => {
            if (!response)
                dispatch(receiveAnonymousAuth());
            else
                dispatch(receiveAuthenticatedAuth(response));
        })
        .catch((error) => {
            dispatch(receiveErrorCondition(error));
        });
    };
}
