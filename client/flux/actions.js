// ------------------------------------------------------------------------
//
// REDUX (FLUX IMPLEMENTATION)
//
// Action List
// - CONFIG-FETCH   Fetches the configuration response
// - CONFIG-PROCESS Processes the configuration response
//
// ------------------------------------------------------------------------

// Action Types
export const CONFIG_FETCH   = Symbol();
export const CONFIG_PROCESS = Symbol();

// Action Creators
export function fetchConfiguration(api='/api/config') {
    return { type: CONFIG_FETCH, api: api };
}

export function processConfiguration(configData) {
    return { type: CONFIG_PROCESS, data: configData };
}
