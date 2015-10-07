import Fluxible from 'fluxible';
import Application from 'components/Application';
import Routes from 'config/Routes';
import ApplicationStore from 'stores/ApplicationStore';
import PeekExperimentsStore from 'stores/PeekExperimentsStore';
import IteneraryStore from 'stores/IteneraryStore';

// create new fluxible instance
const app = new Fluxible({});

// register stores
app.registerStore(ApplicationStore);
app.registerStore(PeekExperimentsStore);
app.registerStore(IteneraryStore);

module.exports = app;
