import Radium from 'radium';
import React from 'react';

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
        // The name of the user (if any)
        name: React.PropTypes.string,
        // Is the left menu open or closed?
        open: React.PropTypes.bool.isRequired,
        // Event Handler called when the menu state changes
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
        console.warn('LeftMenu#onRequestChange - not overridden - open = ', open); // eslint-disable-line no-console
        return false;
    }

    /**
     * Convert a user hash into a Gravatar URL
     * @param {string} hash the users hash
     * @returns {string} the gravatar URL
     */
    gravatarIcon(hash) {
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

        // Fill these in later
        let title = this.props.name || 'Not Logged In';
        let subtitle = '';
        let avatar = this.gravatarIcon('00000000000000000000000000000000');

        return (
            <LeftNav docked={false} onRequestChange={onRequestChange} open={this.props.open}>
                <Card style={styles.usercard}>
                    <CardHeader title={title} subtitle={subtitle} avatar={avatar}/>
                </Card>
            </LeftNav>
        );
    }
}

