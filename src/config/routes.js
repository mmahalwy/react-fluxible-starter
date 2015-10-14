import React from 'react';
import { IndexRoute, Route, Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { connectToStores, provideContext, FluxibleContext } from 'fluxible-addons-react';

import Application from 'components/Application';
import Home from 'components/Home';
import About from 'components/About';
import app from '../../app';
import createElement from 'utils/createElement';


export default function(context, history) {
  let routerHistory = history || {listen: function(){}};

  if (process.env.BROWSER) {
    routerHistory = createBrowserHistory()
  }

  return (
    <Router history={routerHistory} createElement={createElement(context)}>
      <Route path="/" component={Application}>
          <Route path="about" component={About}/>
          <IndexRoute component={Home}/>
      </Route>
    </Router>
  );
};
