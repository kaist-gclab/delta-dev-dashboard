import React from 'react';
import { inject, observer } from 'mobx-react';
import DashboardStore from './store';

const Interval = 4096;

interface Props {
    dashboard?: DashboardStore
}

@inject("dashboard")
@observer
class Dashboard extends React.Component<Props> {
    interval!: NodeJS.Timeout;
    componentDidMount() {
        this.tick();
        this.interval = setInterval(this.tick, Interval);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    tick = () => {
        this.props.dashboard!.fetch();
    }
    render() {
        const dashboard = this.props.dashboard!;
        if (!dashboard.dashboardModel) {
            return <div>불러오는 중</div>;
        }
        return <div>{dashboard.dashboardModel.projectTitle}</div>;
    }
}

export default Dashboard;
