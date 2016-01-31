import constants from '../constants';

/**
 * Redux Action Creator for toggling left menu visibility
 * @param {bool} open the requested state of the left menu
 * @returns {Object} Redux Action
 */
export function displayLeftMenu(open) {
    return {
        type: constants.ui.leftMenuVisibility,
        visibility: open
    };
}
