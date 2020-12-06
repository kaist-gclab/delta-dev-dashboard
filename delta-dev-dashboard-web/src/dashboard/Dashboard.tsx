import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Colors } from '@blueprintjs/core';
import { formatDateTime } from './util';
import Summary from './Summary';
import TargetDetails from './TargetDetails';
import Repositories from './Repositories';
import TimeProgressBar from './TimeProgressBar';
import { DashboardContext } from './context';

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
  margin: 0;
  height: 2px;
  background: ${Colors.GRAY1};
`;

const CurrentInstant = styled.div`
  text-align: right;
  font-size: 1.5vh;
  color: ${Colors.GRAY1};
`;

export const Dashboard: React.FC = () => {
  const dashboard = useContext(DashboardContext);

  const model = dashboard.dashboardModel;

  if (!model) {
    return <h1>불러오는 중</h1>;
  }

  const { projectTitle, currentInstant } = model;
  return <Wrapper>
    <Title>{projectTitle}</Title>
    <Summary model={model} />
    <TimeProgressBar model={model} />
    <HR />
    <TargetDetails model={model} />
    <HR />
    <Repositories model={model} />
    <CurrentInstant>갱신 시각: {formatDateTime(currentInstant)}</CurrentInstant>
  </Wrapper>;
};

export default observer(Dashboard);
