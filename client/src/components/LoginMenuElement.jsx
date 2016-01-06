import React from 'react';

import MenuElement from './MenuElement.jsx';

/**
 * LoginMenuElement Component - handles a login capability
 * @extends React.Component
 */
export default class LoginMenuElement extends React.Component {
    /**
     * The React API property definitions
     *
     * @type {Object}
     * @readonly
     * @static
     *
     * PropTypes
     *  {bool} menu - is this is a menu or an icon only?
     */
    static propTypes = {
        menu: React.PropTypes.bool.isRequired
    };

    /**
     * Create a new LoginMenuElement (React Component)
     *
     * @param {Object} props the React props
     * @returns {void}
     */
    constructor(props) {
        super(props);
    }

    /**
     * React API - render() method
     * Renders the login menu option
     * @returns {JSX.Element} a JSX Expression
     */
    render() {
        return <MenuElement menu={this.props.menu} icon="login" title="Login"/>;
    }
}
