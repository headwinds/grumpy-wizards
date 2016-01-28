import Radium from 'radium';
import React from 'react';
import { connect } from 'react-redux';

// Library Components
import AppBar from 'material-ui/lib/app-bar';

// My Components
import ErrorIndicator from '../components/ErrorIndicator.jsx';
import Footer from '../components/Footer.jsx';
import LeftMenu from '../components/LeftMenu.jsx';
import PhaseIconButton from '../components/PhaseIconButton.jsx';

// Action Creators
import { displayLeftMenu } from '../redux/actions';

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
        children: React.PropTypes.node,
        dispatch: React.PropTypes.func.isRequired,
        error: React.PropTypes.string,
        open: React.PropTypes.bool.isRequired,
        phase: React.PropTypes.string.isRequired,
        user: React.PropTypes.object
    };

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
        let onToggleLeftMenu = () => { return dispatch(displayLeftMenu(!this.props.open)); };
        let onLeftMenuRequestChange = (open) => { return dispatch(displayLeftMenu(open)); };

        // Component Options
        let appbarOptions = {
            iconElementRight: <PhaseIconButton phase={this.props.phase} />,
            style: { backgroundColor: appStyle.color1 },
            title: 'Grumpy Wizards',
            onLeftIconButtonTouchTap: onToggleLeftMenu
        };

        return (
            <div style={style}>
                <ErrorIndicator phase={this.props.phase} error={this.props.error}/>
                <header>
                    <AppBar {...appbarOptions} />
                </header>
                <section style={{ flexGrow: 1 }}>
                    {this.props.children}
                </section>
                <Footer/>
                <LeftMenu open={this.props.open} user={this.props.user} onRequestChange={onLeftMenuRequestChange} />
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
            error: state.error,
            open: state.leftMenuVisibility,
            phase: state.phase,
            user: state.user
        };
    })(Chrome);
