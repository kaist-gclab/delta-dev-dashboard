import React from 'react';
import { inject, observer } from 'mobx-react';
import DashboardStore from './store';
import styled from 'styled-components';
import { Colors } from '@blueprintjs/core';
import { formatDateTime } from './util';
import Summary from './Summary';
import TargetDetails from './TargetDetails';
import Repositories from './Repositories';

const Interval = 4096;

interface Props {
  dashboard?: DashboardStore
}

const Wrapper = styled.div`
  height: 95vh;
  width: 118vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.div`
  font-size: 4.2vh;
  color: ${Colors.LIGHT_GRAY3};
  text-align: center;
`;

const HR = styled.hr`
  width: 100%;
  border: 0;
  height: 2px;
  background: ${Colors.GRAY1};
`;

const CurrentInstant = styled.div`
  text-align: right;
  font-size: 1.5vh;
  color: ${Colors.GRAY1};
`;

@inject("dashboard")
@observer
class Dashboard extends React.Component<Props> {
  interval!: number;
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
    const model = this.props.dashboard!.dashboardModel;
    if (!model) {
      return <h1>불러오는 중</h1>;
    }
    const { projectTitle,
      currentInstant,
    } = model;
    return <Wrapper>
      <Title>{projectTitle}</Title>
      <Summary model={model} />
      <HR />
      <TargetDetails model={model} />
      <HR />
      <Repositories model={model} />
      <CurrentInstant>갱신 시각: {formatDateTime(currentInstant)}</CurrentInstant>
    </Wrapper>;
  }
}

export default Dashboard;
