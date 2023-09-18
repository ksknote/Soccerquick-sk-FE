import React, { useState } from 'react';
import styled from 'styled-components';

interface MemberCountPropsType {
  fieldPlayerCount: number;
  setFieldPlayerCount: React.Dispatch<React.SetStateAction<number>>;
  GoalKeeperCount: number;
  setGoalKeeperCount: React.Dispatch<React.SetStateAction<number>>;
}

function MemberCount({
  fieldPlayerCount,
  setFieldPlayerCount,
  GoalKeeperCount,
  setGoalKeeperCount,
}: MemberCountPropsType) {
  return (
    <Wrapper>
      <PositionSection>
        <p>필드 플레이어</p>
        <CountDiv>
          <div>
            <CountIcon
              onClick={() => setFieldPlayerCount((prev) => prev - 1)}
              type="minus"
              count={fieldPlayerCount}
            >
              −
            </CountIcon>
          </div>
          <Count>{fieldPlayerCount}명</Count>
          <CountIcon onClick={() => setFieldPlayerCount((prev) => prev + 1)}>
            +
          </CountIcon>
        </CountDiv>
      </PositionSection>
      <PositionSection>
        <p>골키퍼</p>
        <CountDiv>
          <div>
            <CountIcon
              onClick={() => setGoalKeeperCount((prev) => prev - 1)}
              type="minus"
              count={GoalKeeperCount}
            >
              −
            </CountIcon>
          </div>
          <Count>{GoalKeeperCount}명</Count>
          <CountIcon onClick={() => setGoalKeeperCount((prev) => prev + 1)}>
            +
          </CountIcon>
        </CountDiv>
      </PositionSection>
    </Wrapper>
  );
}

export default MemberCount;

const Wrapper = styled.div`
  font-size: 1.4rem;
  color: #2c2c2c;
  padding-top: 1rem;
  @media (min-width: 1024px) {
    font-size: 1.6rem;
    padding-top: 2rem;
  }
`;

const PositionSection = styled.div`
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  :last-child {
    margin-top: 1rem;
  }
  @media (min-width: 1024px) {
    :last-child {
      margin-top: 1.5rem;
    }
  }
`;

const CountDiv = styled.div`
  display: grid;
  grid-template-columns: 3rem 1fr 3rem;
`;

const CountIcon = styled.div<{ type?: string; count?: number }>`
  width: 3rem;
  height: 3rem;
  display: ${({ type, count }) =>
    type === 'minus' && count === 0 ? 'none' : 'flex'};
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 1.5rem;
  box-shadow: 0 3px 8px 0 rgba(33, 37, 41, 0.05);
  border: 0.1rem solid #e9ecef;
  border-radius: 1rem;
  cursor: pointer;
  :hover {
    background: #edf2eb;
  }
  :active {
    background: #e3e5e2;
  }

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
  -khtml-user-select: none;
  -o-user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const Count = styled.p`
  min-width: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
