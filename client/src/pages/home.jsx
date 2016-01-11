import React from 'react';
import { Link } from 'react-router';

/**
 * Displays the home page
 *
 * @extends React.Component
 */
export default class HomePage extends React.Component {
    /**
     * Render the component
     *
     * @returns {JSX.Element} the JSX Rendering of this component
     * @overrides React.Component#render
     */
    render() {
        return (
            <div className="page--home">
                <h1>{'Home'}</h1>
                <Link to="/spells">{'Spells'}</Link>
            </div>
        );
    }
}
