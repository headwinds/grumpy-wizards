import React from 'react';
import { IndexRoute, Redirect, Route } from 'react-router';
import Chrome from '../components/Chrome';

import Characters from './Characters';
import Home from './Home';
import Spells from './Spells';
import Tables from './Tables';

/**
 * Routes: https://github.com/rackt/react-router/blob/master/docs/api/components/Route.md
 *
 * Routes are used to declare your view hierarchy.
 */
const routes = (
    <Route path="/" component={Chrome}>
        <IndexRoute component={Home}/>
        <Route path="home" component={Home}/>
        <Route path="spells" component={Spells}/>
        <Route path="booktables" component={Tables}/>
        <Route path="characters" component={Characters}/>
        <Redirect path="*" to="/" />
    </Route>
);

export default routes;
