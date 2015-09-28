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
// import {navigateAction} from 'fluxible-router';

var navigateAction = require('actions/navigate');

import app from './app';
import HtmlComponent from 'components/Html';
import { createElementWithContext } from 'fluxible-addons-react';
const htmlComponent = React.createFactory(HtmlComponent);
var FluxibleComponent = require('fluxible-addons-react/FluxibleComponent');
import createLocation from 'history/lib/createLocation'
import { Router, RoutingContext, match } from 'react-router'
import routes from 'configs/Routes'
import { renderToString } from 'react'


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

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    let contextProps = renderProps;
    contextProps.createElement = function(component, props) {
      console.log(component);
      return React.createElement(component, Object.assign(props, {context: context.getComponentContext()}));
    };

    // console.log(renderProps);
    // console.log(context.getComponentContext());
    console.log(contextProps);
    const html = React.renderToStaticMarkup(htmlComponent({
      clientFile: env === 'production' ? 'main.min.js' : 'main.js',
      context: context.getComponentContext(),
      state: exposed,
      markup: renderToString(
        <FluxibleComponent context={context.getComponentContext()}>
          <RoutingContext {...contextProps} />
        </FluxibleComponent>
      )
    }));

    res.send(html);
    res.end();
  });
  // let context = app.createContext();
  // Router.run(app.getComponent(), req.path, function (Handler, state) {
    // context.getActionContext().executeAction(navigateAction, state, function() {
      // debug('Exposing context state');
      // const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

  //     debug('Rendering Application component into html');
  //     var Component = React.createFactory(Handler);
  //
  //     const html = React.renderToStaticMarkup(htmlComponent({
  //       clientFile: env === 'production' ? 'main.min.js' : 'main.js',
  //       context: context.getComponentContext(),
  //       state: exposed,
  //       markup: React.renderToString(
  //         React.createElement(
  //           FluxibleComponent,
  //           { context: context.getComponentContext() },
  //           Component()
  //         )
  //       )
  //     }));
  //       // markup: React.renderToString(createElementWithContext(context))
  //     debug('Sending markup');
  //     res.type('html');
  //     res.write('<!DOCTYPE html>' + html);
  //     res.end();
  //   });
  // });

  // debug('Executing navigate action');
  // context.getActionContext().executeAction(navigateAction, {
  //     url: req.url
  // }, (err) => {
  //     if (err) {
  //         if (err.statusCode && err.statusCode === 404) {
  //             next();
  //         } else {
  //             next(err);
  //         }
  //         return;
  //     }
  //
  //
  //     debug('Rendering Application component into html');
  //     const html = React.renderToStaticMarkup(htmlComponent({
  //         clientFile: env === 'production' ? 'main.min.js' : 'main.js',
  //         context: context.getComponentContext(),
  //         state: exposed,
  //         markup: React.renderToString(createElementWithContext(context))
  //     }));
  //
  //     debug('Sending markup');
  //     res.type('html');
  //     res.write('<!DOCTYPE html>' + html);
  //     res.end();
  // });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log('Application listening on port ' + port);

export default server;
