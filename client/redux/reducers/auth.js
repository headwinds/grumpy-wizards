import constants from '../constants';

const initialState = {
    phase: 'pending',
    user: null,
    error: null
};

/* eslint-disable no-case-declarations */
/**
 * Redux Reducer for authentication
 * @param {Object} state the initial state
 * @param {Object} action the Redux Action object
 * @returns {Object} the new state
 */
export default function authReducer(state = initialState, action) {
    switch (action.type) {
    case constants.auth.setAnonymous:
        return Object.assign({}, state, {
            phase: 'anonymous',
            user: null,
            error: null
        });

    case constants.auth.setAuthenticated:

        let claims = action.providerInfo.user_claims.reduce((target, claim) => {
            target[claim.typ] = claim.val;
            if (claim.typ.indexOf('http://schemas.xmlsoap.org/ws') !== -1)
                target[claim.typ.slice(claim.typ.lastIndexOf('/') + 1)] = claim.val;
            return target;
        });

        let user = {
            accessToken: action.providerInfo.access_token,
            claims: claims,
            givenname: claims.givenname || '',
            name: claims.name || '',
            id: action.providerInfo.user_id,
            provider: action.providerInfo.provider_name,
            providerToken: action.providerInfo.authentication_token,
            surname: claims.surname || ''
        };

        return Object.assign({}, state, {
            phase: 'authenticated',
            user: user,
            error: null
        });

    case constants.auth.setError:
        return Object.assign({}, state, {
            phase: 'error',
            user: null,
            error: action.error.message
        });

    default:
        return state;
    }
}

