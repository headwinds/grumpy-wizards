import Radium from 'radium';
import React from 'react';
import appStyle from '../style/appStyle';

/**
 * React Component: Display a centered component with the icon links on the home page
 * @extends React.Component
 */
@Radium
export default class HomeIconLink extends React.Component {
    /**
     * React property types
     * @type {Object}
     * @readonly
     */
    static propTypes = {
        children: React.PropTypes.node,
        icon: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired
    };

    /**
     * Radium styling
     * @type {Object}
     * @readonly
     */
    get stylesheet() {
        return {
            outer: {
                margin: '0 auto',
                width: '60%'
            }
        };
    }

    /**
     * Render the component
     * @returns {JSX.Element} the rendered component
     */
    render() {
        return (
            <div style={this.stylesheet.outer}>
                <div className="icon">{this.props.icon}</div>
                <div className="title">{this.props.title}</div>
                <div className="content">{this.props.children}</div>
            </div>
        );
    }
}
