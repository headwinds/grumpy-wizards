import Radium from 'radium';
import React from 'react';
import IconButton from 'material-ui/lib/icon-button';

import ClientLogger from '../lib/logger';
import appStyle from '../style/appStyle';

let logger = new ClientLogger('AuthenticationButton.jsx');

/**
 * Render an authenticator button, with dispatch to login capabilities
 * @extemds React.Component
 */
 @Radium
export default class AuthenticationButton extends React.Component {
    static propTypes = {
        authenticated: React.PropTypes.bool.isRequired,
        error: React.PropTypes.any,
        onTouchTap: React.PropTypes.function,
        style: React.PropTypes.object
    };

    /**
     * Returns the default values of non-specified properties
     *
     * @returns {Object} the default values for properties
     * @overrides React.Component#getDefaultProps
     */
    getDefaultProps() {
        return {
            error: false,
            onTouchTap: () => { logger.warn('No onTouchTap function registered'); },
            style: {}
        };
    }

    /**
     * onTouchTap handler for the IconButton
     * @param {SyntheticEvent} event the synthetic event that React provides
     * @returns {bool} true if the event was handled
     */
    onTouchTap(event) {
        logger.entry('onTouchTap', event);

        // Call the defined onTouchTap from the properties.
        this.props.onTouchTap(event);

        return logger.exit('onTouchTap', true);
    }

    /**
     * Returns the stylesheet
     * @type {object}
     * @readonly
     */
    get stylesheet() {
        logger.entry('stylesheet');

        let defaultStyle = {
            color: this.props.error ? appStyle.redback : '#FFFFFF'
        };
        let stylesheet = Object.assign(defaultStyle, this.props.style);

        return logger.exit('stylesheet', stylesheet);
    }

    /**
     * Returns the icon to be used in the button
     * @type {Object}
     * @readonly
     */
    get icon() {
        logger.entry('icon');
        if (this.props.error) return logger.exit('icon', { icon: 'alert-octagon', tooltip: 'Error' });
        if (this.props.authenticated) return logger.exit('icon', { icon: 'logout', tooltip: 'Logout' });
        return logger.exit('icon', { icon: 'login', tooltip: 'Login' });
    }

    /**
     * Render the JSX element
     * @returns {JSX.Element} the rendered conent
     */
    render() {
        logger.entry('render');

        // eslint believes tooltip is a event handler, hence this.icon.tooltip must be a function
        // This is, of course, wrong, so we have to disable the rule.
        /* eslint-disable react/jsx-handler-names */
        let jsx = (
            <IconButton
                iconClassName={`mdi mdi-${this.icon.icon}`}
                iconStyle={this.stylesheet}
                tooltip={this.icon.tooltip}
                tooltipPosition="bottom-center"
                onTouchTap={this.props.onTouchTap} />
        );
        /* eslint-enable react/jsx-handler-names */

        return logger.exit('render', jsx);
    }
}
