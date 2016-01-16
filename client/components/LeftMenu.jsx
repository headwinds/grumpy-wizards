import Radium from 'radium';
import React from 'react';
import { Card, CardHeader } from 'material-ui/lib/card';
import LeftNav from 'material-ui/lib/left-nav';

import appStyle from '../style/appStyle';
import ClientLogger from '../lib/logger';

let logger = new ClientLogger(__filename);

/**
 * Render the left hand navigation bar.
 * @extemds React.Component
 */
 @Radium
export default class LeftMenu extends React.Component {
    static propTypes = {
        authenticated: React.PropTypes.bool.isRequired,
        onRequestChange: React.PropTypes.func.isRequired,
        open: React.PropTypes.bool.isRequired,
        style: React.PropTypes.object
    };

    /**
     * Get the default style for the component
     * @returns {Object} the Radium style object
     */
    getDefaultStyle() {
        return {
            usercard: {
                backgroundColor: appStyle.color1
            }
        };
    }

    /**
     * Convert a user hash into a Gravatar URL
     * @param {string} hash the users hash
     * @returns {string} the gravatar URL
     */
    gravatarIcon(hash) {
        return `http://www.gravatar.com/avatar/${hash}?d=mm`;
    }

    /**
     * Render the JSX element
     * @returns {JSX.Element} the rendered conent
     */
    render() {
        logger.entry('render');
        logger.debug('props = ', this.props);

        let styles = Object.assign({}, this.getDefaultStyle(), this.props.style);
        logger.debug('style = ', styles);

        let authName = 'Not Logged In';
        let authEmail = 'Log in for more';
        let gravatarIcon = this.gravatarIcon('00000000000000000000000000000000');

        let jsx = (
            <LeftNav docked={false} onRequestChange={this.props.onRequestChange} open={this.props.open}>
                <Card style={styles.usercard}>
                    <CardHeader title={authName} subtitle={authEmail} avatar={gravatarIcon}/>
                </Card>
            </LeftNav>
        );

        return logger.exit('render', jsx);
    }
}
