/**
 * Redux Reducer for authentication
 * @param {Object} state the initial state
 * @param {Object} action the Redux Action object
 * @returns {Object} the new state
 */
/* eslint-disable no-case-declarations */
export default function authReducer(state, action) {
    switch (action.type) {
    case 'AUTH-ANONYMOUS':
        return Object.assign({}, state, {
            phase: 'anonymous',
            user: null,
            error: null
        });

    case 'AUTH-AUTHENTICATED':

        let claims = action.providerInfo.reduce((target, claim) => {
            target[claim.typ] = claim.val;
            if (claim.typ.indexOf('http://schemas.xmlsoap.org/ws') !== -1)
                target[claim.typ.slice(claim.typ.lastIndexOf('/') + 1)] = claim.val;
            return claims;
        });

        let user = {
            accessToken: action.providerInfo.access_token,
            claims: claims,
            firstname: claims.firstname || '',
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

    case 'AUTH-ERROR':
        return Object.assign({}, state, {
            phase: 'error',
            user: null,
            error: action.error.message
        });

    default:
        return state;
    }
}
