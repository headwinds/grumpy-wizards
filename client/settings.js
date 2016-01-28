/*
** Get an object with the settings in it (or defaults)
*/
let defaultSettings = {
    env: 'production',
    base: ''
};

let currentSettings = Object.assign({}, defaultSettings, window.GRUMPYWIZARDS || {});

// Fix up the base URL if necessary
currentSettings.base = currentSettings.base.replace(/\/$/, '');

export default currentSettings;
