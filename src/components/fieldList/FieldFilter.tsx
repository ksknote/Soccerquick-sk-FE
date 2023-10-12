import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import resetIcon from '../../assets/icon/reset_black.svg';

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

function FieldFilter(props: FilterProps) {
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
    <FilterContainer>
      <Filters>
        {item.map((item, index) => (
          <FilterItem
            key={index}
            active={item.selected}
            onClick={() => handleButtonClick(index)}
          >
            {item.value}
          </FilterItem>
        ))}
      </Filters>
      <ButtonContainer>
        <ResetButton onClick={handleReset}>
          <img src={resetIcon} alt="resetIcon" />
          <p>초기화</p>
        </ResetButton>
      </ButtonContainer>
    </FilterContainer>
  );
}

export default FieldFilter;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 0.1rem solid #e6e6e6;
  @media (min-width: 1024px) {
    padding: 1.5rem 1rem;
  }
`;

const Filters = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const FilterItem = styled.span<{ active: boolean }>`
  height: fit-content;
  padding: 0.3rem 0.8rem;
  margin-bottom: 0.875rem;
  margin-right: 0.875rem;
  border: ${({ active }) =>
    active ? '0.1rem solid #63c963' : '0.1rem solid #ced4da'};
  border-radius: 0.4rem;
  background: white;
  :hover {
    background: #f1f3f5;
  }
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 400;
  font-weight: ${({ active }) => (active ? 500 : 400)};
  color: ${({ active }) => (active ? '#1c831c' : '#3e4042')};
  @media (min-width: 1024px) {
    padding: 0.5rem 1rem;
    font-size: 1.4rem;
  }
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const ButtonContainer = styled.div`
  min-width: 4rem;
`;

const ResetButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  padding: 0.7rem 1rem;
  border: 0.1rem solid rgb(231, 233, 234);
  border-radius: 1rem;
  background: #fff;
  color: #333;
  font-size: 1.4rem;
  white-space: nowrap;
  :hover {
    background: #f1f3f5;
  }
  @media (min-width: 1024px) {
    padding: 0.7rem 1.2rem;
  }
  img {
    width: 1.8rem;
    height: 1.8rem;
    @media (min-width: 768px) {
      margin-right: 0.5rem;
    }
  }
  p {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
