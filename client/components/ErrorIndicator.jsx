import Radium from 'radium';
import React from 'react';
import appStyle from '../style/appStyle';

/**
 * React Component: Display a banner DIV when there is an error
 * @extends React.Component
 */
@Radium
export default class ErrorIndicator extends React.Component {
    /**
     * React PropTypes
     * @type {Object}
     * @readonly
     */
    static propTypes = {
        phase: React.PropTypes.string.isRequired,
        error: React.PropTypes.string
    };

    /**
     * Radium styling
     * @type {Object}
     * @readonly
     */
    static style = {
        backgroundColor: appStyle.redback,
        color: '#FFFFFF',
        font: `1rem ${appStyle.fonts.sans}`,
        padding: '0.4rem 0',
        textAlign: 'center',
        width: '100%'
    };

    /**
     * Render the component
     * @returns {JSX.Element} the rendered component
     */
    render() {
        if (this.props.phase === 'error')
            return <div style={ErrorIndicator.style}>{this.props.error}</div>;
        return <div style={{ display: 'none' }}></div>;
    }
}
