import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import ResetIcon from '../../../styles/icon/reset_white.svg';

const ResetMapBtn = () => {
  return (
    <StyledButton>
      <StyledButtonIcon>
        <img src={ResetIcon} alt="" />
      </StyledButtonIcon>
      <StyledButtonContent>현 위치에서 검색</StyledButtonContent>
    </StyledButton>
  );
};

export default ResetMapBtn;

const StyledButton = styled.div`
  position: absolute;
  display: table;
  padding: 1rem 0.8rem;
  table-layout: auto;
  border-radius: 2.3rem;
  background-color: var(--color--darkgreen);
  z-index: 10;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledButtonIcon = styled.div`
  display: table-cell;
  display: inline-block;
  width: 2.7rem;
  height: 2.7rem;
  padding-top: 0.2rem;
  margin-left: 0.7rem;
`;

const StyledButtonContent = styled.div`
  max-width: 17rem;
  height: 3rem;
  padding: 0 1.5rem 0 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
  color: white;
  font-size: 1.7rem;
  letter-spacing: -0.04rem;
  font-weight: 600;
  line-height: 3rem;
`;
