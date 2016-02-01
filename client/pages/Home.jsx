import Radium from 'radium';
import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

@Radium
class Home extends React.Component {
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
        const page1 = () => { return dispatch(routeActions.push('/page1')); };

        return (
            <div id="homePage">
                <h1>{'Home'}</h1>
                <ul>
                    <li><button onClick={page1}>Page 1</button></li>
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
    })(Home);
