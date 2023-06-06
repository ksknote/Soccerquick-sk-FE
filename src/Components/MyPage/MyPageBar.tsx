import react, { useState } from 'react';
import styled from 'styled-components';

type MyPageBarProps = {
  checkedBarItem: number;
  setCheckedBarItem: React.Dispatch<React.SetStateAction<number>>;
};

function MyPageBar({ checkedBarItem, setCheckedBarItem }: MyPageBarProps) {
  const handleClickBarItem = (newItem: number) => {
    setCheckedBarItem(newItem);
  };

  return (
    <StyledBar>
      <StyledBarItemContainer>
        <StyledBarItem
          selected={checkedBarItem === 1}
          onClick={() => handleClickBarItem(1)}
        >
          정보 수정
        </StyledBarItem>
        <StyledBarItem
          selected={checkedBarItem === 2}
          onClick={() => handleClickBarItem(2)}
        >
          내 글 검색
        </StyledBarItem>
        <StyledBarItem
          selected={checkedBarItem === 3}
          onClick={() => handleClickBarItem(3)}
        >
          즐겨찾는 경기장
        </StyledBarItem>
      </StyledBarItemContainer>
    </StyledBar>
  );
}

export default MyPageBar;

const StyledBar = styled.div`
  width: 98.4rem;
  padding: 0 2rem;
  height: 2rem;
  margin: 1.4rem auto;

  display: flex;
  justify-content: space-between;
  align-items: baseline;

  background-color: #fff;
  color: #727f88;
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2rem;
  letter-spacing: -0.12rem;
`;

const StyledBarItemContainer = styled.div`
  display: flex;
  width: 80%;
`;

const StyledBarItem = styled.div<{ selected: boolean }>`
  margin: 0 1rem;
  color: ${(props) => (props.selected ? '#282B33' : '#727f88')};
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
`;
