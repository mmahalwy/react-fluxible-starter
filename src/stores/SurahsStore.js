import BaseStore from 'fluxible/addons/BaseStore';
import debugLib from 'debug';
const debug = debugLib('new-pirate');

class SurahsStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);

    this.surahs = [];
  }

  getSurahs() {
    return this.surahs;
  }

  dehydrate() {
    return {
      surahs: this.surahs
    };
  }
  rehydrate(state) {
    this.surahs = state.surahs;
  }
}

SurahsStore.storeName = 'SurahsStore';

SurahsStore.handlers = {
  surahsReceived(surahs) {
    debug('surahsReceived')
    this.surahs = surahs;
    this.emitChange();
  }
}

export default SurahsStore;
