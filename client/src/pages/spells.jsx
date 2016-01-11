import React from 'react';
import { Link } from 'react-router';

/**
 * Displays the home page
 *
 * @extends React.Component
 */
export default class SpellsPage extends React.Component {
    static propTypes = {
        children: React.PropTypes.node
    };

    /**
     * Render the component
     *
     * @returns {JSX.Element} the JSX Rendering of this component
     * @overrides React.Component#render
     */
    render() {
        let spellComponent = '';
        if (React.Children.count(this.props.children) > 0) {
            spellComponent = <div className="spellInfo">{this.props.children}</div>;
        }
        return (
            <div className="page--spells">
                <h1>{'Spells Page'}</h1>
                <Link to="/">{'Home'}</Link>
                <Link to="/spell/foo">{'Spell Foo'}</Link>
                {spellComponent}
            </div>
        );
    }
}
