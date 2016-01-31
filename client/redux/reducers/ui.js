import constants from '../constants';

const initialState = {
    leftMenuVisibility: false
};

/**
 * Redux Reducer for UI manipulation
 *
 * @param {Object} state the initial state
 * @param {Object} action the Redux Action object
 * @returns {Object} the new state
 */
export default function uiReducer(state = initialState, action) {
    if (action.type === constants.ui.leftMenuVisibility) {
        return Object.assign({}, state, {
            leftMenuVisibility: action.visibility
        });
    }
    return state;
}
