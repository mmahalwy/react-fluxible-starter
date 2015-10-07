import BaseStore from 'fluxible/addons/BaseStore';

class IteneraryStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);

    this.iteneraries = [];
  }

  getIteneraries() {
    return this.iteneraries;
  }

  dehydrate() {
    return {
      iteneraries: this.iteneraries
    };
  }
  rehydrate(state) {
    this.iteneraries = state.iteneraries;
  }
}

IteneraryStore.storeName = 'IteneraryStore';

IteneraryStore.handlers = {
  itenerariesReceived(iteneraries) {
    // console.log(iteneraries);
    this.iteneraries = iteneraries;
    this.emitChange();
  }
}

export default IteneraryStore;
