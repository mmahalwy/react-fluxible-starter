import React from 'react';
import { IndexRoute, Route, Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { connectToStores, provideContext, FluxibleContext } from 'fluxible-addons-react';

import Application from 'components/Application';
import Home from 'components/Home';
import About from 'components/About';
import app from '../../app';

let history = {listen: function(){}};

if (typeof window !== 'undefined') {
  history = createBrowserHistory()
}

function createElement(Component, props) {
  // Could add custom props here!
  if (Component.preRender) {
    const action = Component.preRender();
    // This is using the window.context. This is bad. Not scalable whatsoever and eventually we will need
    // to do things another way. For now, celebrate!
    context.executeAction(action.action, action.payload ? action.payload : null, function() {
      return <Component {...props} />;
    });
  }

  return <Component {...props} />;

}

const routes = (
    <Router history={history} createElement={createElement}>
      <Route path="/" component={Application}>
          <Route path="about" component={About}/>
          <IndexRoute component={Home}/>
      </Route>
    </Router>
);

export default routes;
