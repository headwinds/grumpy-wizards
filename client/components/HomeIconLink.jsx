import Radium from 'radium';
import React from 'react';
import appStyle from '../style/appStyle';

import CircleIcon from '../components/CircleIcon';

/**
 * React Component: Display a centered component with the icon links on the home page
 * @extends React.Component
 */
class HomeIconLink extends React.Component {
    /**
     * React property types
     * @type {Object}
     * @readonly
     */
    static propTypes = {
        children: React.PropTypes.node,
        icon: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func,
        title: React.PropTypes.string.isRequired
    };

    /**
     * Radium styling
     * @returns {Object} stylesheet
     */
    stylesheet() {
        return {
            outer: {
                'margin': '0 auto',
                'width': '60%',
                'padding': '1rem 0',

                ':hover': {
                    cursor: 'pointer',
                    background: appStyle.color1
                }
            },
            title: {
                font: `bold 1.5rem ${appStyle.fonts.sans}`
            }
        };
    }

    /**
     * Click Handler
     * @param {Event} event the synthetic event causing the call
     * @returns {bool} true if the event was handled
     */
    onClick(event) {
        if (this.props.onClick)
            return this.props.onClick(event);
        return false;
    }

    /**
     * Render the component
     * @returns {JSX.Element} the rendered component
     */
    render() {
        const stylesheet = this.stylesheet();
        const onClick = (event) => { return this.onClick(event); };

        return (
            <div style={stylesheet.outer} onClick={onClick}>
                <CircleIcon icon={this.props.icon}/>
                <div style={stylesheet.title}>{this.props.title}</div>
                <div className="content">{this.props.children}</div>
            </div>
        );
    }
}

export default Radium(HomeIconLink); // eslint-disable-line new-cap
