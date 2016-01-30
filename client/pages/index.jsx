import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Chrome from '../components/Chrome';

import Home from './Home';
import PageOne from './PageOne';

/**
 * Routes: https://github.com/rackt/react-router/blob/master/docs/api/components/Route.md
 *
 * Routes are used to declare your view hierarchy.
 */
const routes = (
    <Route path="/" component={Chrome}>
        <IndexRoute component={Home}/>
        <Route path="home" component={Home}/>
        <Route path="page1" component={PageOne}/>
    </Route>
);

export default routes;
