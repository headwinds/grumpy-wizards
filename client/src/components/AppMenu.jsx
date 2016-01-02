import React from 'react';

// Components
import MenuElement from './MenuElement.jsx';

// Stylesheet
require('./AppMenu.scss');

/**
 * AppMenu component - Variable menu structure.
 *  If there is only one item, it is displayed in the menu
 *  If there is more thana reasonable amount, then they are displayed
 *  in a hamburger menu.
 * @extends React.Component
 */
export default class AppMenu extends React.Component {
    /**
     * React API - render() method
     * Renders the application menu
     * @returns {JSX.Element} a JSX Expression
     */
    render() {
        return (
            <div className="appmenu">
                <ul>
                    <li><MenuElement style="v" icon="login" title="Login"/></li>
                </ul>
            </div>
        );
    }
}
