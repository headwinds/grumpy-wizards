import React from 'react';
import appStore from '../flux/appstore';
import ClientLogger from '../flux/logger';

import Footer from './Footer.jsx';
import Header from './Header.jsx';

require('./Page.scss');

let logger = new ClientLogger('Page.jsx');

/**
 * @extends React.Component
 */
export default class Page extends React.Component {
    static propTypes = {
        children: React.PropTypes.node
    };

    /**
     * Invoked once before the component is mounted for the first time
     * @returns {Object} the initial state
     */
    getInitialState() {
        logger.entry('getInitialState');
        let initState = {
            errorMessage: null
        };
        logger.exit('getInitialState', initState);
        return initState;
    }

    /**
     * Invoked immediately before the initial rendering of the component
     * @returns {void}
     */
    componentWillMount() {
        logger.entry('componentWillMount');

        logger.debug('registering view with AppStore');
        this.storeid = appStore.addStoreListener(() => {
            logger.trace('AppStore has updated - updating state');
            this.updateState();
        });
        logger.debug('store ID = ', this.storeid);
        this.updateState();
        logger.exit('componentWillMount');
    }

    /**
     * Invoked immediately before a component is unmounted from the DOM
     * @returns {void}
     */
    componentWillUnmount() {
        logger.entry('componentWillUnmount');
        appStore.removeStoreListener(this.storeid);
        logger.exit('componentWillUnmount');
    }

    /**
     * Private method to update the state of this component from the
     * application store.
     * @returns {void}
     */
    updateState() {
        logger.entry('updateState');

        let newState = {
            errorMessage: appStore.errorMessage
        };
        logger.debug('updateState: new state = ', newState);
        this.setState(newState);

        logger.exit('updateState');
    }

    /**
     * Render the component
     *
     * @returns {JSX.Element} the JSX Rendering of this component
     * @overrides React.Component#render
     */
    render() {
        logger.entry('render');

        let errorComponent = '';
        if (this.state.errorMessage) {
            logger.debug('render: There is an error message in state');
            errorComponent = <div className="error"><strong>{'ERROR: '}</strong>{this.state.errorMessage}</div>;
        } else {
            logger.debug('render: no error message in state');
        }

        let jsx = (
            <div className="page">
                {errorComponent}
                <div><Header/></div>
                <div className="page--grow">{this.props.children}</div>
                <div><Footer/></div>
            </div>
        );

        logger.exit('render');
        return jsx;
    }
}
