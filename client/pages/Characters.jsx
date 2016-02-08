import Radium from 'radium';
import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

@Radium
class Characters extends React.Component {
    /**
     * React property types
     * @type {Object}
     * @readonly
     */
    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        phase: React.PropTypes.string.isRequired
    };

    /**
     * Render the component
     * @returns {JSX.Element} the rendered component
     * @overrides React.Component#render
     */
    render() {
        const dispatch = this.props.dispatch;
        const home = () => { return dispatch(routeActions.push('/home')); };

        return (
            <div id="Characters">
                <h1>{'Characters'}</h1>
                <ul>
                    <li><button onClick={home}>Home</button></li>
                </ul>
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
            phase: state.auth.phase
        };
    })(Characters);
