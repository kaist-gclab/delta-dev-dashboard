import React from 'react';
import Dashboard from './dashboard/Dashboard';
import styled from 'styled-components';
import { Colors } from '@blueprintjs/core';

const Wrapper = styled.div`
  background-color: ${Colors.DARK_GRAY3};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const App: React.FC = () => {
  return (
    <Wrapper>
      <Dashboard></Dashboard>
    </Wrapper>
  );
}

export default App;
