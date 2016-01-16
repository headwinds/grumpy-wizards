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
        style: React.PropTypes.object
    };

    /**
     * Render the JSX element
     * @returns {JSX.Element} the rendered conent
     */
    render() {
        logger.entry('render');
        logger.debug('props = ', this.props);

        let classes = 'mdi mdi-alert-octagon';
        let tooltip = 'Error';
        if (!this.props.error) {
            classes = this.props.authenticated ? 'mdi mdi-logout' : 'mdi mdi-login';
            tooltip = this.props.authenticated ? 'Logout' : 'Login';
        }
        let defaultStyle = {
            color: this.props.error ? appStyle.redback : '#FFFFFF'
        };
        let style = Object.assign(defaultStyle, this.props.style);
        logger.debug('style = ', style);

        let jsx = <IconButton iconClassName={classes} iconStyle={style} tooltip={tooltip} tooltipPosition="bottom-center"/>;

        return logger.exit('render', jsx);
    }
}
