import Radium from 'radium';
import React from 'react';

/**
 * React Component: Display an icon in a circle mold
 * @extends React.Component
 */
class CircleIcon extends React.Component {
    /**
     * React property types
     * @type {Object}
     * @readonly
     */
    static propTypes = {
        icon: React.PropTypes.string.isRequired
    };

    /**
     * Returns the Radium stylesheet
     * @returns {Object} style sheet
     */
    stylesheet() {
        const dimension = '5vw';

        return {
            image: {
                background: '#eeeeee',
                borderRadius: '50%',
                height: dimension,
                width: dimension
            }
        };
    }

    /**
     * Render the component
     * @returns {JSX.Element} the rendered component
     */
    render() {
        const stylesheet = this.stylesheet();

        return (
            <div>
                <img src={this.props.icon} style={stylesheet.image}/>
            </div>
        );
    }
}

export default Radium(CircleIcon); // eslint-disable-line new-cap
