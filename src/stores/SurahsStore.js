import BaseStore from 'fluxible/addons/BaseStore';

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
    // console.log(surahs);
    this.surahs = surahs;
    this.emitChange();
  }
}

export default SurahsStore;
