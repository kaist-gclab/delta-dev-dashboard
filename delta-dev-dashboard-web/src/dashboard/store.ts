import { observable, flow } from 'mobx';
import { DashboardModel } from './types';
import DashboardRepository from './repository';

class DashboardStore {
    @observable
    dashboardModel?: DashboardModel;

    constructor(private dashboardRepository = DashboardRepository) {
    }

    fetch = flow(function* (this: DashboardStore) {
        this.dashboardModel = yield this.dashboardRepository.fetch();
    })
}

export default DashboardStore;
