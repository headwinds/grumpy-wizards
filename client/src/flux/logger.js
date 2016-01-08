/**
 * Send logging messages to the client log facilities
 */
export default class ClientLogger {
    /**
     * Create a new logger object
     * @param {string} module the module name
     * @param {number} [minLevel] the minimum level to log
     * @returns {void}
     */
    constructor(module, minLevel) {
        this.module = module;
        this.private = {
            minLevel: minLevel || this.logLevels.debug
        };
    }

    /**
     * A mapping of log level name to log level ID
     * @type {Object}
     * @readonly
     */
    get logLevels() {
        return {
            trace: 0,
            debug: 1,
            info: 2,
            warn: 3,
            error: 4,
            critical: 5
        };
    }

    /**
     * Returns the current minimum level to log as a number
     * @type {number}
     * @readonly
     */
    get minLevel() {
        if (window && window.CLIENTLOGLEVEL && this.logLevels[window.CLIENTLOGLEVEL]) {
            return this.logLevels[window.CLIENTLOGLEVEL];
        }
        return this.private.minLevel;
    }

    /**
     * Logs a message to the appropriate facility
     * @param {string|number} level the level to log
     * @param {string} msg the message to log
     * @param {...object} args the arguments to log
     * @returns {void}
     */
    log(level, msg, ...args) {
        /* eslint-disable no-console */
        let nLevel = level;

        // Invalid levels are transitioned to 'debug' level
        if (typeof level === 'string') {
            // Invalid levels are transitioned to 'debug' level
            if (level in this.logLevels) {
                nLevel = this.logLevels[level];
            } else {
                nLevel = this.logLevels.debug;
            }
        }
        if (typeof level !== 'string' && typeof level !== 'number') {
            throw new TypeError('kevel is not correct');
        }

        // Bail early if we don't want to call the logger
        if (nLevel < this.minLevel) {
            return;
        }

        let loggedMsg = `[${this.module}]: ${msg}`;
        switch (level) {
        case this.logLevels.trace:
        case this.logLevels.debug:
            console.log(loggedMsg, ...args);
            break;
        case this.logLevels.info:
            console.info(loggedMsg, ...args);
            break;
        case this.logLevels.warn:
            console.warn(loggedMsg, ...args);
            break;
        case this.logLevels.error:
        case this.logLevels.critical:
            console.error(loggedMsg, ...args);
            break;
        default:
            console.log(loggedMsg, ...args);
        }
        /* eslint-enable no-console */
    }

    /**
     * Output a trace message
     * @param {...object} args the arguments
     * @returns {void}
     */
    trace(...args) {
        this.log(0, ...args);
    }

    /**
     * Output a debug message
     * @param {...object} args the arguments
     * @returns {void}
     */
    debug(...args) {
        this.log(1, ...args);
    }

    /**
     * Output an informational message
     * @param {...object} args the arguments
     * @returns {void}
     */
    info(...args) {
        this.log(2, ...args);
    }

    /**
     * Output a warning message
     * @param {...object} args the arguments
     * @returns {void}
     */
    warn(...args) {
        this.log(3, ...args);
    }

    /**
     * Output an error message
     * @param {...object} args the arguments
     * @returns {void}
     */
    error(...args) {
        this.log(4, ...args);
    }

    /**
     * Output a critical error message
     * @param {...object} args the arguments
     * @returns {void}
     */
    critical(...args) {
        this.log(5, ...args);
    }

    /**
     * Output a trace message
     * @param {string} funcname the function name
     * @param {args} args the function arguments
     * @returns {void}
     */
    entry(funcname, args) {
        if (args) {
            this.log(1, `Entry ${funcname} args=`, args);
        } else {
            this.log(1, `Entry ${funcname}`);
        }
    }

    /**
     * Output a function exit message
     * @param {string} funcname the function name
     * @param {object} [returns] the function return value
     * @returns {void}
     */
    exit(funcname, returns) {
        if (returns) {
            this.log(1, `Exit ${funcname} returning `, returns);
        } else {
            this.log(1, `Exit ${funcname}`);
        }
    }
}
