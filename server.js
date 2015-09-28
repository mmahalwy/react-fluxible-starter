/**
* This leverages Express to create and run the http server.
* A Fluxible context is created and executes the navigateAction
* based on the URL. Once completed, the store state is dehydrated
* and the application is rendered via React.
*/

// Express
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import serialize from 'serialize-javascript';
import logger from 'morgan';

// React
import React from 'react';
import { createElementWithContext } from 'fluxible-addons-react';
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';
import createLocation from 'history/lib/createLocation'
import { Router, RoutingContext, match, createRoutes } from 'react-router'


var navigateAction = require('actions/navigate');

import app from './app';
import HtmlComponent from 'components/Html';

import Routes from 'configs/Routes'
const htmlComponent = React.createFactory(HtmlComponent);

// Process
const env = process.env.NODE_ENV;
import debugLib from 'debug';
const debug = debugLib('new-pirate');

// Server setup
const server = express();
server.use('/public', express.static(path.join(__dirname, '/build')));
server.use('/images', express.static(path.join(__dirname, '/static/images')));
server.use(compression());
server.use(bodyParser.json());
server.use(logger('dev'));

// Initial route
server.use((req, res, next) => {
  let location = createLocation(req.url)
  let context = app.createContext();
  const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
  const routes = createRoutes(Routes);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
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
      const html = React.renderToStaticMarkup(htmlComponent({
        clientFile: env === 'production' ? 'main.min.js' : 'main.js',
        styleFile: env === 'production' ? 'main.css' : 'main.css',
        context: context.getComponentContext(),
        state: exposed,
        markup: React.renderToString(
          <FluxibleComponent context={context.getComponentContext()}>
            <RoutingContext {...renderProps} />
          </FluxibleComponent>
        )
      }));

      res.send(html);
      res.end();
    }
  });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log('Application listening on port ' + port);

export default server;
