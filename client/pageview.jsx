import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Chrome from './components/Chrome.jsx';

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
