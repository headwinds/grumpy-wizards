import React from 'react';

// Components
import Header from '../components/Header.jsx';

// Stylesheet
require('./Application.scss');

/**
 * Main Application Router
 * @extends React.Component
 */
export default class Application extends React.Component {
    /**
     * React API - render() method
     * Renders the application view
     * @returns {JSX.Element} a JSX Expression
     */
    render() {
        return (
            <div className="application">
                <div className="application-header">
                    <Header/>
                </div>
                <div className="application-main">
                </div>
                <div className="application-footer">
                </div>
            </div>
        );
    }
}
