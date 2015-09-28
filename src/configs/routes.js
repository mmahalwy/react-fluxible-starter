import React from 'react';
import { DefaultRoute, Route } from 'react-router';
import Application from 'components/Application';
import Home from 'components/Home';
import About from 'components/About';

const routes = (
    <Route name="app" path="/" component={Application}>
        <Route name="about" component={About}/>
        <DefaultRoute name="home" component={Home}/>
    </Route>
);

// export default routes;

export default [
  {path: '/', indexRoute: { component: Home },}
]
