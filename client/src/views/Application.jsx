import React from 'react';

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
                </div>
                <div className="application-main">
                </div>
                <div className="application-footer">
                </div>
            </div>
        );
    }
}
