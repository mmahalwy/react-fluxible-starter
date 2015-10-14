import Fluxible from 'fluxible';
import Application from 'components/Application';
import Routes from 'config/Routes';
import ApplicationStore from 'stores/ApplicationStore';
import PeekExperimentsStore from 'stores/PeekExperimentsStore';
import SurahsStore from 'stores/SurahsStore';

// create new fluxible instance
const app = new Fluxible({});

// register stores
app.registerStore(ApplicationStore);
app.registerStore(PeekExperimentsStore);
app.registerStore(SurahsStore);

module.exports = app;
