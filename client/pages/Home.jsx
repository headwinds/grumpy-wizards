import Radium from 'radium';
import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

import HomeIconLink from '../components/HomeIconLink';

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
     * Returns the Radium stylesheet
     * @returns {Object} radium stylesheet
     */
    stylesheet() {
        return {
            homePage: {
                marginTop: '2rem',
                width: '100%'
            },
            equalwidth: {
                float: 'left',
                textAlign: 'center',
                width: '33%'
            }
        };
    }

    /**
     * Render the component
     * @returns {JSX.Element} the rendered component
     * @overrides React.Component#render
     */
    render() {
        const dispatch = this.props.dispatch;
        const stylesheet = this.stylesheet();
        return (
            <div style={stylesheet.homePage}>
                <div style={stylesheet.equalwidth}>
                    <HomeIconLink icon="images/spells.png" title="Spells">
                        Access a complete set of spells available across multiple Dungeons &amp; Dragons books
                    </HomeIconLink>
                </div>
                <div style={stylesheet.equalwidth}>
                    <HomeIconLink icon="images/tables.png" title="Tables">
                        Quickly get information from a whole host of tables within the Players Handbook and elsewhere
                    </HomeIconLink>
                </div>
                <div style={stylesheet.equalwidth}>
                    <HomeIconLink icon="images/characters.png" title="Characters">
                        Record details of your characters in our character store
                    </HomeIconLink>
                </div>
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
