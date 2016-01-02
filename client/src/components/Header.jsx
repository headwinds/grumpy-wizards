import React from 'react';

// Components
import AppMenu from './AppMenu.jsx';

// Stylesheet
require('./Header.scss');

/**
 * Header Component
 * @extends React.Component
 */
export default class Header extends React.Component {
    /**
     * React API - render() method
     * Renders the header
     * @returns {JSX.Element} a JSX Expression
     */
    render() {
        return (
            <div className="header">
                <div className="header--brand">
                    <h1>{'Grumpy Wizards'}</h1>
                </div>
                <div className="header--menu">
                    <AppMenu/>
                </div>
            </div>
        );
    }
}
