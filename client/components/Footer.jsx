import React from 'react';
import appStyle from '../style/appStyle';

/**
 * React Component: Display the footer
 * @extends React.Component
 */

export default class Footer extends React.Component {
    /**
     * Radium styling
     * @type {Object}
     * @readonly
     */
    static stylesheet = {
        outer: {
            backgroundColor: appStyle.color5,
            display: 'block',
            textAlign: 'center'
        },
        inner: {
            color: appStyle.trans8,
            font: `0.8rem ${appStyle.fonts.sans}`,
            margin: '0.5rem 0'
        }
    };

    /**
     * Render the component
     * @returns {JSX.Element} the rendered component
     */
    render() {
        return (
            <footer style={Footer.stylesheet.outer}>
                <h6 style={Footer.stylesheet.inner}>
                    {'Copyright \u00a9 2016 Adrian Hall'}
                </h6>
            </footer>
        );
    }
}
