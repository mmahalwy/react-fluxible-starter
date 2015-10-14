import BaseStore from 'fluxible/addons/BaseStore';

class PeekExperimentsStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);

    this.experiments = {
      showButton: false
    };

    if (process.env.BROWSER) {
      window.PeekExperiments = this;
    }
  }

  getExperiments() {
    return this.experiments;
  }

  getExperimentsList() {
    return Object.keys(this.experiments)
  }

  setExperiment(experiment, state) {
    this.experiments[experiment] = state || true;
    this.emitChange();
  }

  start(experiment) {
    this.experiments[experiment] = true;
    this.emitChange();
  }

  end(experiment) {
    this.experiments[experiment] = false;
    this.emitChange();
  }
}

PeekExperimentsStore.storeName = 'PeekExperimentsStore';

export default PeekExperimentsStore;
