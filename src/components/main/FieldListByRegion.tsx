import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const regions = [
  '서울',
  '성남',
  '인천',
  '부산',
  '대전',
  '대구',
  '울산',
  '광주',
  '세종',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
];

function FieldListByRegion() {
  const navigate = useNavigate();

  const clickBtnHandler = (region: string) => {
    navigate(`/ground?q=${region}&start=0`);
  };

  return (
    <>
      <ListContainer>
        {regions.map((region) => (
          <ListItem key={region} onClick={() => clickBtnHandler(region)}>
            #{region}
          </ListItem>
        ))}
      </ListContainer>
    </>
  );
}

export default FieldListByRegion;

const ListContainer = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.7rem;
  width: 100%;
  max-width: 50rem;
  margin: auto;
  padding: 3rem 2rem 0rem 2rem;
  @media (min-width: 768px) {
    padding: 1rem 0;
  }
`;

const ListItem = styled.li`
  padding: 0.5rem 1rem;
  border: 0.1rem solid #ced4da;
  border-radius: 3rem;
  background: #f4f5f6;
  font-size: 1.2rem;
  cursor: pointer;
  :hover {
    background: #e7edf2;
  }
  @media (min-width: 768px) {
    font-size: 1.3rem;
  }
`;
