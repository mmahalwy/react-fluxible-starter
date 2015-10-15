/*globals document*/

import React from 'react';
import Nav from './Nav';
import ApplicationStore from '../stores/ApplicationStore';
import { connectToStores, provideContext } from 'fluxible-addons-react';
require('styles/app.scss');
import debugLib from 'debug';
const debug = debugLib('new-pirate');

class Application extends React.Component {
  render() {
    debug(this.props.children);
    return (
      <div>
        <Nav selected={this.props.currentPageName} links={this.props.pages} />
        {this.props.children}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const newProps = this.props;
    if (newProps.pageTitle === prevProps.pageTitle) {
      return;
    }
    document.title = newProps.pageTitle;
  }
}

Application.displayName = 'Application';

export default provideContext(connectToStores(
  Application,
  [ApplicationStore],
  function (context, props) {
    var appStore = context.getStore(ApplicationStore);
    return {
      currentPageName: appStore.getCurrentPageName(),
      pageTitle: appStore.getPageTitle(),
      pages: appStore.getPages()
    };
  }
));
