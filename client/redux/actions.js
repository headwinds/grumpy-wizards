import fetch from 'isomorphic-fetch';

// baseUrl is required for the fetch actions
let baseUrl = '';
if (window.GRUMPYWIZARDS && window.GRUMPYWIZARDS.base)
    baseUrl = window.GRUMPYWIZARDS.base.replace(/\/$/, '');

/**
 * Redux Action Creator for toggling left menu visibility
 * @param {bool} open the requested state of the left menu
 * @returns {Object} Redux Action
 */
export function displayLeftMenu(open) {
    return {
        type: 'UI-LEFTMENU-VISIBILITY',
        visibility: open
    };
}

/**
 * Redux Action Creator for handling anonymous response
 * @returns {Object} Redux Action
 */
function receiveAnonymousAuth() {
    return {
        type: 'AUTH-ANONYMOUS'
    };
}

/**
 * Redux Action Creator for handling authenticated response
 * @param {Array} response the response from the server
 * @returns {Object} Redux Action
 */
function receiveAuthenticatedAuth(response) {
    return {
        type: 'AUTH-AUTHENTICATED',
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
        type: 'AUTH-ERROR',
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
        return fetch(`${baseUrl}/.auth/me`, fetchOptions)
        .then((response) => {
            if (!response.ok && response.status !== 401)
                throw new Error(`Invalid Response from ${baseUrl}/.auth/me:`, response);
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
