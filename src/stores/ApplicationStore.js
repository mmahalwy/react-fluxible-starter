import BaseStore from 'fluxible/addons/BaseStore';

class ApplicationStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.currentPageName = null;
        this.currentPage = null;
        // this.pages = routesConfig;
        this.pageTitle = '';
    }
    handlePageTitle(currentRoute) {
      if (this.currentRoute && route.path === this.currentRoute.path) {
        return;
      }

      this.currentRoute = route;
      this.emitChange();
    }
    getCurrentPageName() {
        return this.currentPageName;
    }
    getPageTitle() {
        return this.pageTitle;
    }
    getPages() {
        return this.pages;
    }
    dehydrate() {
        return {
            currentPageName: this.currentPageName,
            currentPage: this.currentPage,
            pages: this.pages,
            pageTitle: this.pageTitle
        };
    }
    rehydrate(state) {
        this.currentPageName = state.currentPageName;
        this.currentPage = state.currentPage;
        this.pages = state.pages;
        this.pageTitle = state.pageTitle;
    }
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
    'CHANGE_ROUTE': 'handlePageTitle'
};

export default ApplicationStore;
