import React from 'react';
import {provideContext} from 'fluxible-addons-react';


export default function (context) {
  return function (Component, props) {
    console.log('askdahksdjaskjdhakjsdhaskjdhaskjdhaskd');
    props.context = context.getComponentContext();

    if (Component.preRender) {
      const action = Component.preRender();

      context.executeAction(action.action, action.payload ? action.payload : null, function() {
        return React.createElement(provideContext(Component), props);
      });
    }

    return React.createElement(provideContext(Component), props);
  };
};
