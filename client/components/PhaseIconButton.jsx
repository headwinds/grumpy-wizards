import React from 'react';
import IconButton from 'material-ui/lib/icon-button';

/**
 * React Component: Display a status icon for the auth phase
 * @extends React.Component
 */
export default class PhaseIconButton extends React.Component {
    /**
     * React PropTypes
     * @type {Object}
     * @readonly
     */
    static propTypes = {
        phase: React.PropTypes.string.isRequired
    };

    /**
     * Render the React Component
     * @returns {JSX.Element} the rendered component
     */
    render() {
        let statusIcons = {
            pending: 'fa fa-spinner fa-pulse',
            error: 'mdi mdi-alert-octagon',
            anonymous: 'mdi mdi-login',
            authenticated: 'mdi mdi-logout'
        };

        let color = this.props.phase === 'error' ? '#ff0000' : '#ffffff';

        /* eslint-disable react/jsx-handler-names */
        return <IconButton iconStyle={{ color: color }} iconClassName={statusIcons[this.props.phase]} />;
    }
}
