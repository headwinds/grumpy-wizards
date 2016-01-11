import React from 'react';
import { Link } from 'react-router';

/**
 * Displays the home page
 *
 * @extends React.Component
 */
export default class SpellsPage extends React.Component {
    static propTypes = {
        params: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired
        })
    };

    /**
     * Render the component
     *
     * @returns {JSX.Element} the JSX Rendering of this component
     * @overrides React.Component#render
     */
    render() {
        return (
            <div className="page--spell">
                <h1>{`Spell Page for ID ${this.props.params.id}`}</h1>
                <Link to="/spells">{'Spells'}</Link>
                <Link to="/">{'Home'}</Link>
            </div>
        );
    }
}
