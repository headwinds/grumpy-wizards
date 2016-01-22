import React from 'react';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

import Chrome from './components/Chrome.jsx';

let browserHistory = createHistory();

/**
 * The main page router
 * @extends React.Component
 */
export default class PageView extends React.Component {
    /**
     * Render the component - uses react-router as the main page
     * routing technology
     * @returns {JSX.Element} the JSX rendering.
     */
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Chrome}>
                </Route>
            </Router>
        );
    }
}
