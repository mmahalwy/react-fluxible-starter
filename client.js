/*global document, window */

import React from 'react';
import debug from 'debug';
import { createElementWithContext } from 'fluxible-addons-react';
import app from './app';
import Router from 'react-router';
var HistoryLocation = Router.HistoryLocation;
var navigateAction = require('actions/navigate');
var FluxibleComponent = require('fluxible-addons-react/FluxibleComponent');
var Routes = require('configs/Routes');

const debugClient = debug('new-pirate');
const dehydratedState = window.App; // Sent from the server
const mountNode = document.getElementById('app');

window.React = React; // For chrome dev tool support

// expose debug object to browser, so that it can be enabled/disabled from browser:
// https://github.com/visionmedia/debug#browser-support
window.fluxibleDebug = debug;

debugClient('rehydrating app');

// pass in the dehydrated server state from server.js
// app.rehydrate(dehydratedState, (err, context) => {
//     if (err) {
//         throw err;
//     }
//     window.context = context;
//     const mountNode = document.getElementById('app');
//
//     debugClient('React Rendering');
//     React.render(
//         createElementWithContext(context),
//         mountNode,
//         () => debugClient('React Rendered')
//     );
// });
function RenderApp(context, Handler){
  debugClient('React Rendering');
  var mountNode = document.getElementById('app');
  var Component = React.createFactory(Handler);
  React.render(
    React.createElement(
      FluxibleComponent,
      {context: context.getComponentContext()},
      Component()
    ),
    mountNode,
    function () {
      debugClient('React Rendered');
    }
  );
}

app.rehydrate(dehydratedState, function (err, context) {
  if (err) {
    throw err;
  }
  window.context = context;


  React.render(
    React.createElement(
      FluxibleComponent,
      {context: context.getComponentContext()},
      Routes
    ),
    mountNode,
    function () {
      debugClient('React Rendered');
    }
  );
});
