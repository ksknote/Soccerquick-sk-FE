import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import resetIcon from '../../../styles/icon/reset_green.svg';

interface ItemType {
  key: string;
  value: string;
  selected: boolean;
}

const items: ItemType[] = [
  { key: 'shoes', value: '풋살화 대여', selected: false },
  { key: 'toilet', value: '남녀 구분 화장실', selected: false },
  { key: 'ball', value: '공 대여', selected: false },
  { key: 'bibs', value: '조끼 대여', selected: false },
  { key: 'parking_free', value: '무료 주차', selected: false },
  { key: 'parking', value: '주차 가능', selected: false },
  { key: 'shower', value: '샤워실', selected: false },
  { key: 'beverage', value: '음료 구비', selected: false },
];

interface FilterProps {
  setFilterOption: React.Dispatch<React.SetStateAction<ItemType[]>>;
}

function SearchFilter(props: FilterProps) {
  const { setFilterOption } = props;

  // 상태관리 개선
  const [item, setItem] = React.useState(items);

  React.useEffect(() => {
    const filter = item.filter((item) => item.selected);
    setFilterOption(filter);
  }, [item]);

  const handleButtonClick = (index: number) => {
    setItem((prevItems) => {
      const updatedItem = [...prevItems];
      updatedItem[index].selected = !updatedItem[index].selected;
      return updatedItem;
    });
  };
  const handleReset = () => {
    const resetItem = item.map((item) => ({
      ...item,
      selected: false,
    }));
    setItem(resetItem);
  };

  return (
    <>
      <SearchPageOption>
        <StyledTitle>
          <p>필터</p>
          <p>❮</p>
        </StyledTitle>
        <StyledOptions>
          {item.map((item, index) => (
            <StyledTable
              key={index}
              data={item.key} // item 의 원소가 string에서 object로 변경됨.
              active={item.selected}
              onClick={() => handleButtonClick(index)}
            >
              {item.value}
            </StyledTable>
          ))}
        </StyledOptions>
        <ResetButton onClick={handleReset}>
          <img src={resetIcon} alt="resetIcon" />
          <p>초기화</p>
        </ResetButton>
      </SearchPageOption>
    </>
  );
}

export default SearchFilter;

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
  if (data === 'shoes') {
    return '#531dab';
  } else if (data === 'toilet') {
    return '#096dd9';
  } else if (data === 'ball') {
    return '#d4380d';
  } else if (data === 'bibs') {
    return '#08979c';
  } else if (data === 'parking_free') {
    return '#c41d7f';
  } else if (data === 'shower') {
    return '#d46b08';
  } else if (data === 'parking') {
    return '#a442b8';
  } else if (data === 'beverage') {
    return '#5e7f0c';
  }
};
const getBackgroundColorBydata = (data: string) => {
  if (data === 'shoes') {
    return '#f9f0ff';
  } else if (data === 'toilet') {
    return '#e6f7ff';
  } else if (data === 'ball') {
    return '#fff2e8';
  } else if (data === 'bibs') {
    return '#e6fffb';
  } else if (data === 'parking_free') {
    return '#fff0f6';
  } else if (data === 'shower') {
    return '#fff7e6';
  } else if (data === 'parking') {
    return '#fff7e6';
  } else if (data === 'beverage') {
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
