import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import resetIcon from '../../../styles/icon/reset_green.svg';

function SearchFilter(props: any) {
  // 버튼의 상태를 관리할 변수
  const [buttonStates, setButtonStates] = React.useState(
    Array(items.length).fill(false)
  );

  // 선택된 버튼을 필터링 옵션에 추가하는 함수. state를 분리하지 않고 만들 수 있는지 생각 필요함.
  React.useEffect(() => {
    const filter = [];
    for (let idx in items) {
      if (buttonStates[idx]) {
        filter.push(items[idx]);
      }
    }
    props.setFilterOption(filter);
  }, [buttonStates]);

  // 버튼의 클릭여부를 변동시킬 onclick함수
  const handleButtonClick = (index: number) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = !newButtonStates[index];
    setButtonStates(newButtonStates);
  };

  return (
    <>
      <SearchPageOption>
        <StyledTitle>
          <p>필터</p>
          <p>❮</p>
        </StyledTitle>
        <StyledOptions>
          {items.map((item, index) => (
            <StyledTable
              key={index}
              data={item}
              active={buttonStates[index]}
              onClick={() => handleButtonClick(index)}
            >
              {item}
            </StyledTable>
          ))}
        </StyledOptions>
        <ResetButton
          onClick={() => setButtonStates(Array(items.length).fill(false))}
        >
          <img src={resetIcon} alt="resetIcon" />
          <p>초기화</p>
        </ResetButton>
      </SearchPageOption>
    </>
  );
}

export default SearchFilter;

const items = [
  '풋살화 대여',
  '남녀 구분 화장실',
  '공 대여',
  '조끼 대여',
  '무료 주차',
  '샤워실',
];

// Left Bar
const SearchPageOption = styled.div`
  min-width: 18rem;
  position: absolute;
  left: -21rem;
  display: flex;
  float: left;
  flex-direction: column;
  margin: 0.5rem 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1.6rem;
  border: 0.2rem solid #dddddd;
  border-radius: 1rem;
  justify-content: center;
  align-items: center;
  margin: 10px 10px;
`;

const StyledTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--color--darkgreen);
  padding: 1rem;
  border-bottom: 0.2rem solid #dddddd;
`;

const StyledOptions = styled.div`
  padding: 1rem 0;
  width: 100%;
`;

const StyledTable = styled.button<{ data: string; active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  padding: 0.3rem 1rem 0.4rem 1rem;
  margin: 1.2rem 0.7rem;
  border: ${({ active, data }) =>
    active ? `0.2rem solid ${getColorBydata(data)}` : '0.1rem solid #EEEEEE'};
  border-radius: 2rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ data }) => getColorBydata(data)};
  background-color: ${({ active, data }) =>
    active ? getBackgroundColorBydata(data) : '#f3f1ff'};
`;

const getColorBydata = (data: string) => {
  if (data === '풋살화 대여') {
    return '#531dab';
  } else if (data === '남녀 구분 화장실') {
    return '#096dd9';
  } else if (data === '공 대여') {
    return '#d4380d';
  } else if (data === '조끼 대여') {
    return '#08979c';
  } else if (data === '무료 주차') {
    return '#c41d7f';
  } else if (data === '샤워실') {
    return '#d46b08';
  }
};
const getBackgroundColorBydata = (data: string) => {
  if (data === '풋살화 대여') {
    return '#f9f0ff';
  } else if (data === '남녀 구분 화장실') {
    return '#e6f7ff';
  } else if (data === '공 대여') {
    return '#fff2e8';
  } else if (data === '조끼 대여') {
    return '#e6fffb';
  } else if (data === '무료 주차') {
    return '#fff0f6';
  } else if (data === '샤워실') {
    return '#fff7e6';
  }
};

const ResetButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  padding: 0.5rem 1.5rem;
  margin: 1rem 1rem;
  background-color: white;
  font-size: 1.7rem;
  font-weight: 500;
  color: var(--color--darkgreen);
  border: 0.1rem solid green;
  border-radius: 2rem;
  img {
    width: 2.5rem;
    margin-right: 0.3rem;
  }
`;
