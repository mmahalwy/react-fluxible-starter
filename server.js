// Express
import express from 'express';
import serialize from 'serialize-javascript';
import expressConfig from 'server/config/express';

// React
import React from 'react';
import { createElementWithContext } from 'fluxible-addons-react';
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';
import createLocation from 'history/lib/createLocation'
import { Router, RoutingContext, match, createRoutes } from 'react-router'

import app from './app';
import navigateAction from 'actions/navigate';
import HtmlComponent from 'components/Html';
import Routes from 'config/Routes'
const htmlComponent = React.createFactory(HtmlComponent);

// Process
const env = process.env.NODE_ENV;
import debugLib from 'debug';
const debug = debugLib('new-pirate');

// Server setup
const server = express();
expressConfig(server);

const preRenderData = function(components, context, callback) {
  const preRenderComponent = components.find(component => {return component && !!component.preRender});

  if (!preRenderComponent) {
    return callback && callback();
  }

  let action = preRenderComponent.preRender();

  // TODO: Need to allow for the params to be passed to the actions.
  context.executeAction(action.action, action.payload ? action.payload : null, function() {
    return callback && callback();
  });
};

// Initial route
server.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    webpack_isomorphic_tools.refresh()
  }

  let location = createLocation(req.url)
  const routes = createRoutes(Routes);

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
      let context = app.createContext();

      preRenderData(renderProps.components, context, function() {
        debug('Pre-render data fetch completed');

        // This is where the magic happens, we dehydrate the stores to pass to the client.
        const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
        const html = React.renderToStaticMarkup(htmlComponent({
          assets: webpack_isomorphic_tools.assets(),
          context: context.getComponentContext(),
          state: exposed,
          markup: React.renderToString(
            <FluxibleComponent context={context.getComponentContext()}>
              <RoutingContext {...renderProps} />
            </FluxibleComponent>
          )
        }));

        debug('Rendering to html');
        res.send(html);
        res.end();
      });
    }
  });
});

const port = process.env.PORT || 3002;
server.listen(port);
console.log('Application listening on port ' + port);

export default server;
