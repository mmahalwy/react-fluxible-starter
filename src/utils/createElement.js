import React from 'react';
import {provideContext} from 'fluxible-addons-react';
import debugLib from 'debug';
const debug = debugLib('new-pirate');


export default function (context) {
  debug('Create Element Block');
  return function (Component, props) {
    debug(context.executeAction)
    props.context = context.getComponentContext();

    if (Component.preRender) {
      debug('Has preRender ' + Component.displayName);
      debug('Create Element Execute Action Started');
      Component.preRender(context, props, function() {
        debug('Create Element Execute Action Finished');
        return React.createElement(provideContext(Component), props);
      });
    }

    debug('Create Element no ajax ' + Component.displayName);
    return React.createElement(provideContext(Component), props);
  };
};
