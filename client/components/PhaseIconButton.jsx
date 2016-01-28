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
        phase: React.PropTypes.string.isRequired,
        onTouchTap: React.PropTypes.func
    };

    /**
     * Event Handler for when a user clicks on the phase icon
     * @param {Event} event the event that caused the ccall
     * @returns {bool} true if the event was handled
     */
    onTouchTap(event) {
        console.info('PhaseIconButton#onTouchTap: ', event); // eslint-disable-line no-console
        if (this.props.onTouchTap) {
            this.props.onTouchTap(event);
            event.preventDefault();
            return true;
        }
        return false;
    }

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
        let onTouchTap = (event) => { return this.onTouchTap(event); };

        /* eslint-disable react/jsx-handler-names */
        return <IconButton iconStyle={{ color: color }} iconClassName={statusIcons[this.props.phase]} onTouchTap={onTouchTap} />;
    }
}
