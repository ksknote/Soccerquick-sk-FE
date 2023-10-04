import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function FieldListByRegion() {
  const navigate = useNavigate();

  const clickBtnHandler = (region: string) => {
    navigate(`/ground?q=${region}&start=0`);
  };

  return (
    <>
      <ListContainer>
        <ListItem onClick={() => clickBtnHandler('서울')}>#서울</ListItem>
        <ListItem onClick={() => clickBtnHandler('성남')}>#성남</ListItem>
        <ListItem onClick={() => clickBtnHandler('인천')}>#인천</ListItem>
        <ListItem onClick={() => clickBtnHandler('부산')}>#부산</ListItem>
        <ListItem onClick={() => clickBtnHandler('대전')}>#대전</ListItem>
        <ListItem onClick={() => clickBtnHandler('대구')}>#대구</ListItem>
        <ListItem onClick={() => clickBtnHandler('울산')}>#울산</ListItem>
        <ListItem onClick={() => clickBtnHandler('광주')}>#광주</ListItem>
        <ListItem onClick={() => clickBtnHandler('세종')}>#세종</ListItem>
        <ListItem onClick={() => clickBtnHandler('강원')}>#강원</ListItem>
        <ListItem onClick={() => clickBtnHandler('충북')}>#충북</ListItem>
        <ListItem onClick={() => clickBtnHandler('충남')}>#충남</ListItem>
        <ListItem onClick={() => clickBtnHandler('전북')}>#전북</ListItem>
        <ListItem onClick={() => clickBtnHandler('전남')}>#전남</ListItem>
        <ListItem onClick={() => clickBtnHandler('경북')}>#경북</ListItem>
        <ListItem onClick={() => clickBtnHandler('경남')}>#경남</ListItem>
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
  @media (min-width: 768px) {
    margin-top: -3rem;
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
