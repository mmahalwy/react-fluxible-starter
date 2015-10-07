import { Router, RoutingContext, match, createRoutes } from 'react-router'

import Routes from 'config/routes';


export default function(location, history, cb) {
  const routes = createRoutes(history);
  return new Promise((resolve, reject) => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      debug('Route matched');
      if (redirectLocation) {
        res.redirect(301, redirectLocation.pathname + redirectLocation.search)
      }
      else if (error) {
        res.send(500, error.message)
      }
      else if (renderProps == null) {
        res.send(404, 'Not found')
      }
      else{
        debug('Pre-render data fetch');
      }
    });
  });
}
