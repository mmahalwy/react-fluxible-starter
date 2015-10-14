import React from 'react';
import { connectToStores, provideContext } from 'fluxible-addons-react';

import * as SurahsAction from 'actions/Surahs';

import SurahsStore from 'stores/SurahsStore';
import PeekExperimentsStore from 'stores/PeekExperimentsStore';

import Button from 'components/Button';

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderSurahs() {
    return this.props.surahs.map(surah => {
      return surah;
    });
  }

  render() {
    const style = require('styles/Home.scss');

    return (
      <div>
        <div className={style.homePicture}>
          <div className={style.heroCopy}>
            <h1>This is a really cool home page and Ki is here</h1>
            <Button style={{color: 'blue'}}>
              Hello there!
            </Button>
          </div>
        </div>
        <div className="container">
          {this.renderSurahs()}
        </div>
      </div>
    );
  }
}

Home.preRender = function() {
  return {action: SurahsAction.getSurahs}
};


export default connectToStores(
  Home,
  [SurahsStore, PeekExperimentsStore],
  function (context, props) {
    var surahsStore = context.getStore(SurahsStore);
    var peekExperimentStore = context.getStore(PeekExperimentsStore);
    return {
      surahs: surahsStore.getSurahs(),
      experiments: peekExperimentStore.getExperiments()
    };
  }
);

// https://dxvgidz67iahm.cloudfront.net/assets/home/v3/home_2-a2a74d3abb5c9b650cc023d77f213a9e.jpg
