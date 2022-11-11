import { runInAction, makeAutoObservable } from 'mobx';
import { DashboardModel } from './types';
import DashboardRepository from './repository';

const Interval = 4096;

class DashboardStore {
    dashboardModel?: DashboardModel;
    dashboardRepository = DashboardRepository;

    constructor() {
        makeAutoObservable(this);
        this.tick();
        setInterval(() => { this.tick(); }, Interval);
    }

    tick() {
        this.fetch();
    }

    async fetch() {
        const dashboard = await this.dashboardRepository.fetch();
        runInAction(() => { this.dashboardModel = dashboard; });
    }
}

export default DashboardStore;
