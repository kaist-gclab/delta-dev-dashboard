import React from 'react';
import { inject, observer } from 'mobx-react';
import DashboardStore from './store';
import styled from 'styled-components';
import { Colors, Callout, Tag, Icon, H4 } from '@blueprintjs/core';
import moment from 'moment';

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

const Summary = styled.div`
  display: flex;
  flex-direction: row;
  & > div {
    margin: 10px;
  }
`;

const SummaryCardTitle: React.FC = (props) =>
  <div>
    <H4>{props.children}</H4>
  </div>

const SummaryCard = styled(Callout)`
  & > div {
    & > h4 {
      color: ${Colors.LIGHT_GRAY3};
    }
    margin-bottom: 10px;
  }
  & > span:not(:last-child) {
    margin-right: 5px;
    margin-bottom: 5px;
  }
`;

const SummaryCardElementTag = styled(Tag)`
  & > span {
    min-width: 125px;
    text-align: center;
  }
`;

const SummaryCardElement: React.FC = (props) =>
  <SummaryCardElementTag large={true}>{props.children}</SummaryCardElementTag>;

const CurrentInstant = styled.div`
  text-align: right;
  font-size: 1.5vh;
  color: ${Colors.GRAY1};
`;

function formatDate(text: Date): string {
  return moment(text).format('YYYY-MM-DD');
}

function formatDateTime(text: Date): string {
  return moment(text).format('YYYY-MM-DD HH:mm:ss');
}

function getTotalDays(begin: Date, end: Date): number {
  return moment(end).diff(moment(begin)) / 1000 / 86400;
}

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
      projectStartDate,
      projectDueDate,
      gitHubStatistics,
      gitHubTargetsBegin,
      gitHubTargetsEnd,
    } = model;
    return <Wrapper>
      <Title>{projectTitle}</Title>
      <Summary>
        <SummaryCard icon="time">
          <SummaryCardTitle>프로젝트 기본 정보</SummaryCardTitle>
          <SummaryCardElement><Icon icon="flame" /> 시작 {formatDate(projectStartDate)}</SummaryCardElement>
          <SummaryCardElement><Icon icon="notifications" /> 종료 목표 {formatDate(projectDueDate)}</SummaryCardElement>
          <SummaryCardElement><Icon icon="calendar" /> 계획 기간 {getTotalDays(projectStartDate, projectDueDate)}일</SummaryCardElement>
        </SummaryCard>
        <SummaryCard icon="time">
          <SummaryCardTitle>시작 지표</SummaryCardTitle>
          <SummaryCardElement><Icon icon="git-repo" /> 저장소 {gitHubTargetsBegin.repositories}개</SummaryCardElement>
          <SummaryCardElement><Icon icon="git-commit" /> 커밋 {gitHubTargetsBegin.commits}개</SummaryCardElement>
          <SummaryCardElement><Icon icon="star" /> 스타 {gitHubTargetsBegin.stargazers}개</SummaryCardElement>
          <SummaryCardElement><Icon icon="people" /> 기여자 {gitHubTargetsBegin.contributors}명</SummaryCardElement>
        </SummaryCard>
        <SummaryCard icon="time">
          <SummaryCardTitle>목표 지표</SummaryCardTitle>
          <SummaryCardElement><Icon icon="git-repo" /> 저장소 {gitHubTargetsEnd.repositories}개</SummaryCardElement>
          <SummaryCardElement><Icon icon="git-commit" /> 커밋 {gitHubTargetsEnd.commits}개</SummaryCardElement>
          <SummaryCardElement><Icon icon="star" /> 스타 {gitHubTargetsEnd.stargazers}개</SummaryCardElement>
          <SummaryCardElement><Icon icon="people" /> 기여자 {gitHubTargetsEnd.contributors}명</SummaryCardElement>
        </SummaryCard>
      </Summary>
      <CurrentInstant>갱신 시각: {formatDateTime(currentInstant)}</CurrentInstant>
    </Wrapper>;
  }
}

export default Dashboard;
