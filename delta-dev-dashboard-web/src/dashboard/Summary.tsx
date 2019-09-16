import React from 'react';
import styled from 'styled-components';
import { H4, Callout, Tag, Icon, Colors } from '@blueprintjs/core';
import { formatDate, getTotalDays } from './util';
import { DashboardModel } from './types';

const Container = styled.div`
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

interface Props {
  model: DashboardModel,
}

const Summary: React.FC<Props> = (props) => {
  const { model } = props;
  const { projectStartDate,
    projectDueDate,
    gitHubTargetsBegin,
    gitHubTargetsEnd,
  } = model;
  return <Container>
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
  </Container>;
};

export default Summary;
