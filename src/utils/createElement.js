import React from 'react';
import {provideContext} from 'fluxible-addons-react';


export default function (context) {
  console.log('Create Element Block');
  return function (Component, props) {
    props.context = context.getComponentContext();

    if (Component.preRender) {
      const action = Component.preRender();

      context.executeAction(action.action, action.payload ? action.payload : null, function() {
        console.log('Create Element Execute Action Finished');
        return React.createElement(provideContext(Component), props);
      });
    }

    return React.createElement(provideContext(Component), props);
  };
};
