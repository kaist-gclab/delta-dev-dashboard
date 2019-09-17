import React from 'react';
import styled from 'styled-components';
import { ProgressBar } from '@blueprintjs/core';
import { formatDate } from './util';
import { DashboardModel } from './types';
import { observer } from 'mobx-react';
import moment from 'moment';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DateBegin = styled.span`
  width: 140px;
  font-size: 18px;
  text-align: left;
`;

const DateEnd = styled.span`
  width: 140px;
  font-size: 18px;
  text-align: right;
`;

interface Props {
  model: DashboardModel,
}
const TimeProgressBar: React.FC<Props> = (props) => {
  const { model } = props;
  const {
    projectStartDate,
    projectDueDate,
  } = model;
  const begin = moment(projectStartDate).valueOf();
  const end = moment(projectDueDate).valueOf();
  const current = moment().valueOf();
  const value = (current - begin) / (end - begin);
  return <Container>
    <DateBegin>{formatDate(projectStartDate)}</DateBegin>
    <ProgressBar intent="primary" value={value} />
    <DateEnd>{formatDate(projectDueDate)}</DateEnd>
  </Container>;
};

export default observer(TimeProgressBar);
