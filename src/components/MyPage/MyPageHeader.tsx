import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import chevronIcon from '../../styles/icon/chevron_grey.svg';

function MyPageHeader({
  totalItemsCount,
  title,
}: {
  totalItemsCount?: number;
  title: string;
}) {
  const navigate = useNavigate();
  return (
    <>
      <StyledBoardTitle onClick={() => navigate(-1)}>
        <img src={chevronIcon} alt="" />
        <span>마이페이지</span>
      </StyledBoardTitle>
      <StyledTitleDiv>
        {title}
        {totalItemsCount && <span> ( 총 {totalItemsCount} 건 )</span>}
      </StyledTitleDiv>
    </>
  );
}

export default MyPageHeader;

const StyledBoardTitle = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    font-size: 1.5rem;
    font-weight: 500;
    color: grey;
    padding-bottom: 0.5rem;
    cursor: pointer;
    img {
      width: 1.1rem;
      margin-right: 0.3rem;
    }
  }
`;

const StyledTitleDiv = styled.div`
  display: flex;
  width: 90%;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;

  > span {
    padding-left: 1rem;
    align-self: flex-end;
    font-size: 1.5rem;
    line-height: 3rem;
    color: grey;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
