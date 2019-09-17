import React from 'react';
import styled from 'styled-components';
import { H4, Callout, Tag, Icon, Colors } from '@blueprintjs/core';
import { formatDate, getTotalDays, sum } from './util';
import { DashboardModel } from './types';
import { observer } from 'mobx-react';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  & > div {
    margin: 10px;
  }
`;

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

const SummaryCardTitle: React.FC = (props) =>
  <div>
    <H4>{props.children}</H4>
  </div>

const SummaryCardElementTag = styled(Tag)`
  & > span {
    min-width: 125px;
    text-align: center;
  }
`;

interface SummaryCardElementProps {
  complete?: boolean
}
const SummaryCardElement: React.FC<SummaryCardElementProps> = (props) => {
  function getIntent(complete?: boolean) {
    if (complete === true) {
      return 'success';
    }
    if (complete === false) {
      return 'danger';
    }
    return undefined;
  }
  return <SummaryCardElementTag large={true} intent={getIntent(props.complete)}>
    {props.children}
  </SummaryCardElementTag>;
};

interface Props {
  model: DashboardModel,
}

const Summary: React.FC<Props> = (props) => {
  const { model } = props;
  const { projectStartDate,
    projectDueDate,
    gitHubTargetsBegin,
    gitHubTargetsEnd,
    gitHubStatistics,
    repositories,
  } = model;
  const currentRepositories = repositories.length;
  const currentCommits = sum(gitHubStatistics.details.map(d => d.commits));
  const currentStargazers = sum(gitHubStatistics.details.map(d => d.stargazers));
  const currentContributors = gitHubStatistics.contributors;
  return <Container>
    <SummaryCard icon="time">
      <SummaryCardTitle>프로젝트 기본 정보</SummaryCardTitle>
      <SummaryCardElement><Icon icon="flame" /> 시작 {formatDate(projectStartDate)}</SummaryCardElement>
      <SummaryCardElement><Icon icon="notifications" /> 종료 목표 {formatDate(projectDueDate)}</SummaryCardElement>
      <SummaryCardElement><Icon icon="calendar" /> 계획 기간 {getTotalDays(projectStartDate, projectDueDate)}일</SummaryCardElement>
    </SummaryCard>
    <SummaryCard icon="trending-up">
      <SummaryCardTitle>시작 지표</SummaryCardTitle>
      <SummaryCardElement><Icon icon="git-repo" /> 저장소 {gitHubTargetsBegin.repositories}개</SummaryCardElement>
      <SummaryCardElement><Icon icon="git-commit" /> 커밋 {gitHubTargetsBegin.commits}개</SummaryCardElement>
      <SummaryCardElement><Icon icon="star" /> 스타 {gitHubTargetsBegin.stargazers}개</SummaryCardElement>
      <SummaryCardElement><Icon icon="people" /> 기여자 {gitHubTargetsBegin.contributors}명</SummaryCardElement>
    </SummaryCard>
    <SummaryCard icon="locate">
      <SummaryCardTitle>목표 지표</SummaryCardTitle>
      <SummaryCardElement complete={currentRepositories >= gitHubTargetsEnd.repositories}><Icon icon="git-repo" /> 저장소 {currentRepositories} / {gitHubTargetsEnd.repositories}개</SummaryCardElement>
      <SummaryCardElement complete={currentCommits >= gitHubTargetsEnd.commits}><Icon icon="git-commit" /> 커밋 {currentCommits} / {gitHubTargetsEnd.commits}개</SummaryCardElement>
      <SummaryCardElement complete={currentStargazers >= gitHubTargetsEnd.stargazers}><Icon icon="star" /> 스타 {currentStargazers} / {gitHubTargetsEnd.stargazers}개</SummaryCardElement>
      <SummaryCardElement complete={currentContributors >= gitHubTargetsEnd.contributors}><Icon icon="people" /> 기여자 {currentContributors} / {gitHubTargetsEnd.contributors}명</SummaryCardElement>
    </SummaryCard>
  </Container>;
};

export default observer(Summary);
