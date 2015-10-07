import React from 'react';
import { connectToStores, provideContext } from 'fluxible-addons-react';

import * as IteneraryActions from 'actions/Itenerary';

import IteneraryStore from 'stores/IteneraryStore';
import PeekExperimentsStore from 'stores/PeekExperimentsStore';

import Button from 'components/Button';
import IteneraryBlock from 'components/IteneraryBlock';

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderIteneraryBlocks() {
    return this.props.iteneraries.map(itenerary => {
      return <IteneraryBlock itenerary={itenerary} />
    });
  }

  render() {
    const style = require('styles/Home.scss');

    return (
      <div>
        <div className={style.homePicture}>
          <div className={style.heroCopy}>
            <h1>Find the Best Things to Do</h1>
            <h2>Choose from <strong>Thousands</strong> of Activities in <strong>20+</strong> </h2>
            <Button />
          </div>
        </div>
        <div className="container">
          {this.renderIteneraryBlocks()}
        </div>
      </div>
    );
  }
}

Home.preRender = function() {
  return {action: IteneraryActions.getItenerary}
};


export default connectToStores(
  Home,
  [IteneraryStore, PeekExperimentsStore],
  function (context, props) {
    var iteneraryStore = context.getStore(IteneraryStore);
    var peekExperimentStore = context.getStore(PeekExperimentsStore);
    return {
      iteneraries: iteneraryStore.getIteneraries(),
      experiments: peekExperimentStore.getExperiments()
    };
  }
);

// https://dxvgidz67iahm.cloudfront.net/assets/home/v3/home_2-a2a74d3abb5c9b650cc023d77f213a9e.jpg
