import React from 'react';

require('./Vertical.scss');

/**
 * Vertically align something with its parent
 * @extends React.Component
 */
export default class Vertical extends React.Component {
    /**
     * React Property Types
     *
     * @type {Object} propTypes
     * @type {string} proptypes.align
     * @readonly
     */
    static propTypes = {
        align: React.PropTypes.string.isRequired,
        children: React.PropTypes.any // eslint-disable-line react/forbid-prop-types
    };

    /**
     * Render the component
     *
     * @returns {JSX.Element} the JSX Rendering of this component
     * @overrides React.Component#render
     */
    render() {
        let vclass = `vertical--align-${this.props.align}`;

        return (
            <div className="vertical">
                <div className={vclass}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
