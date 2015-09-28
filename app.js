import Fluxible from 'fluxible';
import Application from 'components/Application';
import Routes from 'configs/Routes';
import ApplicationStore from 'stores/ApplicationStore';

// create new fluxible instance
const app = new Fluxible({
    component: Routes
});

// register stores
app.registerStore(ApplicationStore);

module.exports = app;
