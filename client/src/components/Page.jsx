import React from 'react';
import appStore from '../flux/appstore';

import Content from './Content.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

require('./Page.scss');

export default class Page extends React.Component {
    /**
     * Invoked once before the component is mounted for the first time
     * @returns {Object} the initial state
     */
    getInitialState() {
        return {
            errorMessage: null
        };
    }

    /**
     * Invoked immediately before the initial rendering of the component
     * @returns {void}
     */
    componentWillMount() {
        this.storeid = appStore.addStoreListener(() => {
            console.info('[Page.jsx] in store listener callback'); // eslint-disable-line no-console
            this.updateState();
        });
        this.updateState();
    }

    /**
     * Invoked immediately before a component is unmounted from the DOM
     * @returns {void}
     */
    componentWillUnmount() {
        appStore.removeStoreListener(this.storeid);
    }

    /**
     * Private method to update the state of this component from the
     * application store.
     * @returns {void}
     */
    updateState() {
        console.info('[Page.jsx] updateState: errorMessage = ', appStore.errorMessage); // eslint-disable-line no-console
        this.setState({
            errorMessage: appStore.errorMessage
        });
    }

    /**
     * Render the component
     *
     * @returns {JSX.Element} the JSX Rendering of this component
     * @overrides React.Component#render
     */
    render() {
        let errorComponent = '';
        if (this.state.errorMessage) {
            console.log(`error message = ${this.state.errorMessage}`); // eslint-disable-line no-console
            errorComponent = <div className="error">{this.state.errorMessage}</div>;
        }

        return (
            <div className="page">
                {errorComponent}
                <div><Header/></div>
                <div className="page--grow"><Content/></div>
                <div><Footer/></div>
            </div>
        );
    }
}
