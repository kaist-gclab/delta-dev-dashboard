import React from 'react';
import { DashboardModel } from './types';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Card, Elevation, Colors } from '@blueprintjs/core';

interface Props {
  model: DashboardModel,
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  & > div {
    margin: 5px;
  }
`;

const Repository = styled(Card)`
  background-color: ${Colors.DARK_GRAY4};
  font-size: 16px;
`;

const Repositories: React.FC<Props> = (props) => {
  const { model } = props;
  const { repositories } = model;
  function* multilineRepositoryName(name: string) {
    for (let i = 0; i < name.length; i++) {
      if (name[i] === '/') {
        yield '/';
        yield <br key={`BR#${i}`} />;
      } else {
        yield name[i];
      }
    }
  }
  return <Container>
    {repositories.map(r =>
      <Repository key={`REPO#${r}`} elevation={Elevation.TWO}>
        {Array.from(multilineRepositoryName(r))}
      </Repository>)}
  </Container>;
};

export default observer(Repositories);
