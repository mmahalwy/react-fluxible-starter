/*globals document*/
if (process.env.BROWSER === true) {
  require('styles/app.scss');
}

import React from 'react';
import Nav from './Nav';
import ApplicationStore from '../stores/ApplicationStore';
import { connectToStores, provideContext } from 'fluxible-addons-react';
import {RouteHandler} from 'react-router';


class Application extends React.Component {
  render() {
    return (
      <div>
        <Nav selected={this.props.currentPageName} links={this.props.pages} />
        <RouteHandler />
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
