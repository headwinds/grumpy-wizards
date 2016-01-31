import Radium from 'radium';
import React from 'react';
import { connect } from 'react-redux';
import settings from '../settings';

// Library Components
import { AppBar } from 'material-ui';

// My Components
import ErrorIndicator from '../components/ErrorIndicator';
import Footer from '../components/Footer';
import LeftMenu from '../components/LeftMenu';
import PhaseIconButton from '../components/PhaseIconButton';

// Action Creators
import { displayLeftMenu } from '../redux/actions/ui';

// Default Styles
import appStyle from '../style/appStyle';

/**
 * Provides all the chrome around the application
 * @extends React.Component
 */
@Radium
class Chrome extends React.Component {
    /**
     * React property types
     * @type {Object}
     * @readonly
     */
    static propTypes = {
        auth: React.PropTypes.shape({
            error: React.PropTypes.string,
            phase: React.PropTypes.string.isRequired,
            user: React.PropTypes.object
        }),
        children: React.PropTypes.node,
        dispatch: React.PropTypes.func.isRequired,
        ui: React.PropTypes.shape({
            leftMenuVisibility: React.PropTypes.bool.isRequired
        })
    };

    /**
     * Event Handler for when a user clicks on the right icon - this
     * will redirect to the server authentication task
     * @param {Event} event - the synthetic event from React
     * @returns {bool} true if the event was handled
     */
    onAuthenticateAction(event) {
        if (this.props.auth.phase === 'anonymous')
            window.location = `${settings.base}/.auth/login/microsoftaccount`;
        else if (this.props.auth.phase === 'authenticated')
            window.location = `${settings.base}/.auth/logout`;
        else
            console.warn(`Swallowing event - phase '${this.props.auth.phase}' is not valid`); // eslint-disable-line no-console
        event.preventDefault();
        return true;
    }

    /**
     * Render the component
     * @returns {JSX.Element} the rendered component
     * @overrides React.Component#render
     */
    render() {
        let dispatch = this.props.dispatch;

        // Style for the component
        let style = {
            display: 'flex',
            flexFlow: 'column nowrap',
            height: '100%',
            width: '100%'
        };

        // Event Handlers
        let onToggleLeftMenu = () => { return dispatch(displayLeftMenu(!this.props.ui.leftMenuVisibility)); };
        let onLeftMenuRequestChange = (open) => { return dispatch(displayLeftMenu(open)); };
        let onAuthenticateAction = (event) => { return this.onAuthenticateAction(event); };

        // Component Options
        let appbarOptions = {
            iconElementRight: <PhaseIconButton phase={this.props.auth.phase} onTouchTap={onAuthenticateAction} />,
            style: { backgroundColor: appStyle.color1 },
            title: 'Grumpy Wizards',
            onLeftIconButtonTouchTap: onToggleLeftMenu,
            onRightIconButtonTouchTap: onAuthenticateAction
        };
        let leftMenuOptions = {
            open: this.props.ui.leftMenuVisibility,
            user: this.props.auth.user,
            onRequestChange: onLeftMenuRequestChange
        };

        return (
            <div style={style}>
                <ErrorIndicator phase={this.props.auth.phase} error={this.props.auth.error} />
                <header>
                    <AppBar {...appbarOptions} />
                </header>
                <section style={{ flexGrow: 1 }}>
                    {this.props.children}
                </section>
                <Footer/>
                <LeftMenu {...leftMenuOptions} />
            </div>
        );
    }
}

/*
** Link the Chrome component to the Redux store
*/
export default connect(
    (state) => {
        return {
            auth: state.auth,
            ui: {
                leftMenuVisibility: state.ui.leftMenuVisibility
            }
        };
    })(Chrome);
