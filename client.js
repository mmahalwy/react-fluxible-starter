/*global document, window */

import React from 'react';
import debug from 'debug';
import { createElementWithContext } from 'fluxible-addons-react';
import Router from 'react-router';
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';

import app from './app';
import navigateAction from 'actions/navigate';
import Routes from 'config/Routes';

const debugClient = debug('new-pirate');
const dehydratedState = window.App; // Sent from the server
const mountNode = document.getElementById('app');

window.React = React; // For chrome dev tool support

// expose debug object to browser, so that it can be enabled/disabled from browser:
// https://github.com/visionmedia/debug#browser-support
window.fluxibleDebug = debug;

debugClient('rehydrating app');

// pass in the dehydrated server state from server.js
app.rehydrate(dehydratedState, function (err, context) {
  if (err) {
    throw err;
  }

  window.context = context;

  React.render(
    Routes(context),
    mountNode,
    function () {
      debugClient('React Rendered');
    }
  );
});
