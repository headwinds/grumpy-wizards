import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

// Components
import Page from './components/Page.jsx';

// Pages
import HomePage from './pages/home.jsx';
import InvalidPage from './pages/invalid.jsx';
import SpellPage from './pages/spell.jsx';
import SpellsPage from './pages/spells.jsx';

require('./app.scss');

// Render the application
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Page}>
            <IndexRoute component={HomePage}/>
            <Route path="spells" component={SpellsPage}>
                <Route path="/spell/:id" component={SpellPage}/>
            </Route>
        </Route>
        <Route path="*" component={InvalidPage}/>
    </Router>,
    document.getElementById('jsx-page')
);
