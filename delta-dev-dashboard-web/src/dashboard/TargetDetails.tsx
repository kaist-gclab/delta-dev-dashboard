import React from 'react';
import { DashboardModel } from './types';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import TargetCard from './TargetCard';
import { sum } from './util';

interface Props {
  model: DashboardModel,
}

const Error = styled.h2`
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  & > div {
    margin: 10px;
  }
`;

const TargetDetails: React.FC<Props> = (props) => {
  const { model } = props;
  const {
    gitHubStatistics,
    repositories,
    gitHubTargetsBegin,
    gitHubTargetsEnd } = model;
  if (!gitHubStatistics.isComplete) {
    return <Error>GitHub에서 받은 정보가 아직 완전하지 않습니다. 기다려도 나오지 않으면 문의해 주세요.</Error>;
  }

  return <div>
    <Container>
      <TargetCard name="저장소 개수" icon="git-repo"
        begin={gitHubTargetsBegin.repositories}
        end={gitHubTargetsEnd.repositories}
        current={repositories.length}
        description="저장소의 전체 개수입니다. 이 지표는 수동으로 관리됩니다." />
      <TargetCard name="커밋 개수 합계" icon="git-commit"
        begin={gitHubTargetsBegin.commits}
        end={gitHubTargetsEnd.commits}
        current={sum(gitHubStatistics.details.map(d => d.commits))}
        description="전체 저장소의 커밋 개수 합계입니다." />
    </Container>
    <Container>
      <TargetCard name="스타 개수 합계" icon="star"
        begin={gitHubTargetsBegin.stargazers}
        end={gitHubTargetsEnd.stargazers}
        current={sum(gitHubStatistics.details.map(d => d.stargazers))}
        description="전체 저장소의 스타 개수 합계입니다." />
      <TargetCard name="고유한 기여자 수" icon="people"
        begin={gitHubTargetsBegin.contributors}
        end={gitHubTargetsEnd.contributors}
        current={gitHubStatistics.contributors}
        description="GitHub 계정으로 식별 가능한 기여자 목록에서 중복을 제거한 것입니다." />
    </Container>
  </div>;
};

export default observer(TargetDetails);
