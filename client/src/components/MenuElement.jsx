import React from 'react';

// Stylesheet
require('./MenuElement.scss');

/**
 * MenuElement Component - displays a menu element or an icon
 *  based on settings - can be used either way.
 * @extends React.Component
 */
export default class MenuElement extends React.Component {
    /**
     * The React API property definitions
     *
     * @type {Object}
     * @readonly
     * @static
     *
     * PropTypes
     *  {string} icon - the icon name from the MDI collection
     *  {string} title - the icon title
     *  {bool} menu - is this is a menu or an icon only?
     */
    static propTypes = {
        icon: React.PropTypes.string.isRequired,
        menu: React.PropTypes.bool.isRequired,
        title: React.PropTypes.string.isRequired
    };

    /**
     * React API - render() method
     * Renders the menu option
     * @returns {JSX.Element} a JSX Expression
     */
    render() {
        let classes = `mdi mdi-${this.props.icon}`;
        let mainclass = this.props.menu ? 'menuelement-menu' : 'menuelement';
        let iconclass = `${mainclass}--icon`;
        let titleclass = `${mainclass}--title`;

        return (
            <div className={mainclass}>
                <div className={iconclass}><span className={classes}></span></div>
                <div className={titleclass}>{this.props.title}</div>
            </div>
        );
    }
}

