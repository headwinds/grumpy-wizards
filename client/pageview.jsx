import React from 'react';
import { Router } from 'react-router';
import { createHistory } from 'history';
import AppRoutes from './pages/index.jsx';

let browserHistory = createHistory({ queryKey: false });

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
        let onUpdate = () => { window.scrollTo(0, 0); };

        return (
            <Router history={browserHistory} onUpdate={onUpdate}>
                {AppRoutes}
            </Router>
        );
    }
}
