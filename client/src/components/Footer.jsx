import React from 'react';

require('./Footer.scss');

/**
 * @extends React.Component
 */
export default class Footer extends React.Component {
    /**
     * Render the component
     *
     * @returns {JSX.Element} the JSX Rendering of this component
     * @overrides React.Component#render
     */
    render() {
        return (
            <footer>
                <div className="footer--left"></div>
                <div className="footer--center"></div>
                <div className="footer--right"></div>
            </footer>
        );
    }
}
