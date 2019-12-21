import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Callout, Colors, H4, ProgressBar, IconName, Icon, Tag } from '@blueprintjs/core';

interface Props {
  begin: number,
  end: number,
  current: number,
  name: string,
  icon: IconName,
  description: string,
}

const Container = styled(Callout)`
  & > div {
    & > h4 {
      color: ${Colors.LIGHT_GRAY3};
    }
    margin-bottom: 10px;
  }
`;

interface TargetCardTitleProps {
  icon: IconName,
}

const TitleIcon = styled(Icon)`
  svg {
    width: 25px;
    height: 25px;
  }
  margin-left: 5px;
`;

const H4Title = styled(H4)`
  display: inline;
  margin-left: 10px;
`;

const TargetCardTitle: React.FC<TargetCardTitleProps> = (props) =>
  <div>
    <TitleIcon icon={props.icon} />
    <H4Title>{props.children}</H4Title>
  </div>

const Description = styled.span`
  font-size: 16px;
`;

const Value: React.FC = (props) => <Tag large={true}>{props.children}</Tag>;
const Values = styled.div`
  display: flex;
  flex-direction: row;
`;
const ValueLeft = styled.span`
  & span {
    margin-right: 10px;
    font-size: 16px;
  }
`;
const ValueRight = styled.span`
  font-size: 19px;
  margin-left: auto;
`;

const TargetCard: React.FC<Props> = (props) => {
  const { begin, end, current, name, icon, description } = props;
  const complete = current >= end;
  const value = (current - begin) / (end - begin);
  let progress = `누적 ${(current / end * 100).toFixed()}% 달성`;
  if (end - begin > 0) {
    progress = `당해 연도 ${(value * 100).toFixed()}%, ` + progress;
  }
  return <Container>
    <TargetCardTitle icon={icon}>{name}</TargetCardTitle>
    <ProgressBar value={value} stripes={!complete} animate={!complete} intent={complete ? 'success' : 'danger'} />
    <Values>
      <ValueLeft>
        <Value>시작 {begin}</Value>
        <Value>현재 {current}</Value>
        <Value>목표 {end}</Value>
      </ValueLeft>
      <ValueRight>{progress}</ValueRight>
    </Values>
    <Description>{description}</Description>
  </Container>;
};

export default observer(TargetCard);
