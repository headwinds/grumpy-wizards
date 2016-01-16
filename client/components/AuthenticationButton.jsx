import React from 'react';
import IconButton from 'material-ui/lib/icon-button';

import ClientLogger from '../lib/logger';

let logger = new ClientLogger(__filename);

/**
 * Render an authenticator button, with dispatch to login capabilities
 * @extemds React.Component
 */
export default class AuthenticationButton extends React.Component {
    static propTypes = {
        authenticated: React.PropTypes.bool.isRequired
    };

    /**
     * Render the JSX element
     * @returns {JSX.Element} the rendered conent
     */
    render() {
        logger.entry('render');
        logger.debug('props = ', this.props);

        let classes = this.props.authenticated ? 'mdi mdi-logout' : 'mdi mdi-login';
        let tooltip = this.props.authenticated ? 'Logout' : 'Login';
        let jsx = <IconButton iconClassName={classes} tooltip={tooltip} tooltipPosition="bottom-center"/>;

        return logger.exit('render', jsx);
    }

}
