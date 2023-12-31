import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import chevron from '../../assets/icon/chevron_grey.png';

function MobilePageHeader({ title }: { title: string }) {
  const navigate = useNavigate();
  return (
    <Title>
      <img src={chevron} alt="chevron" onClick={() => navigate(-1)} />
      <p>{title}</p>
      <div></div>
    </Title>
  );
}

export default MobilePageHeader;

const Title = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  display: grid;
  grid-template-columns: 2.5rem 1fr 2.5rem;
  border-bottom: 0.15rem solid #dfdfdf;
  padding: 1.5rem 2rem;
  background: white;
  img {
    display: flex;
    align-items: center;
    width: 2rem;
    padding-top: 0.2rem;
    cursor: pointer;
  }
  p {
    font-size: 1.6rem;
    font-weight: 500;
    color: #585858;
    text-align: center;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;
