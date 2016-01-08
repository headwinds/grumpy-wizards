import React from 'react';
import ClientLogger from '../flux/logger';

require('./Vertical.scss');

let logger = new ClientLogger('Vertical');

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
        logger.entry('render');

        let vclass = `vertical--align-${this.props.align}`;
        logger.debug(`render: vclass = ${vclass}`);

        let jsx = (
            <div className="vertical">
                <div className={vclass}>
                    {this.props.children}
                </div>
            </div>
        );
        logger.exit('render');
        return jsx;
    }
}
