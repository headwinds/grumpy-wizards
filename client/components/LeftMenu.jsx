import Radium from 'radium';
import React from 'react';
import md5 from 'md5';

// Library Components
import { Card, CardHeader } from 'material-ui/lib/card';
import LeftNav from 'material-ui/lib/left-nav';

// Default Styles
import appStyle from '../style/appStyle';

/**
 * Provides all the chrome around the application
 * @extends React.Component
 */
@Radium
export default class LeftMenu extends React.Component {
    /**
     * React property types
     * @type {Object}
     * @readonly
     */
    static propTypes = {
        user: React.PropTypes.object,
        open: React.PropTypes.bool.isRequired,
        onRequestChange: React.PropTypes.func,
        // Style over-rides
        style: React.PropTypes.object
    };

    /**
     * Default Stylesheet
     * @type {Object}
     * @readonly
     */
    static stylesheet = {
        usercard: {
            backgroundColor: appStyle.color1
        }
    };

    /**
     * Event Handler for the onRequestChange method
     * @param {bool} open the state of the left menu
     * @returns {bool} true if the event was handled
     */
    onRequestChange(open) {
        if (this.props.onRequestChange)
            return this.props.onRequestChange(open);
        return false;
    }

    /**
     * Convert a user hash into a Gravatar URL
     * @param {string} email the users email address
     * @returns {string} the gravatar URL
     */
    gravatarIcon(email = '') {
        let hash = '00000000000000000000000000000000';
        if (email !== '')
            hash = md5(hash.trim().toLowerCase());
        if (window.location.protocol === 'https:')
            return `https://secure.gravatar.com/avatar/${hash}?d=mm`;
        return `http://www.gravatar.com/avatar/${hash}?d=mm`;
    }

    /**
     * Render the component
     * @returns {JSX.Element} the rendered component
     * @overrides React.Component#render
     */
    render() {
        let styles = Object.assign(LeftMenu.stylesheet, this.props.style);
        let onRequestChange = (open) => { return this.onRequestChange(open); };

        // We get the user object, so need to pull the name and email addressl
        let defaultOptions ={
            title: 'Not Logged In',
            subtitle: '',
            avatar: this.gravatarIcon('')
        };

        return (
            <LeftNav docked={false} onRequestChange={onRequestChange} open={this.props.open}>
                <Card style={styles.usercard}>
                    <CardHeader {...defaultOptions} />
                </Card>
            </LeftNav>
        );
    }
}

