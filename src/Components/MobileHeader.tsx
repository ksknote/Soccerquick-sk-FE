import React from 'react';
import styled from 'styled-components';
import chevron from '../styles/icon/chevron_green.svg';
function MobileHeader({ title }: { title: string }) {
  return (
    <Title>
      <img src={chevron} alt="chevron" />
      <span>{title}</span>
    </Title>
  );
}

export default MobileHeader;

const Title = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  aline-items: center;
  img {
    width: 0.8rem;
  }
  span {
    padding-left: 0.6rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: rgb(113, 193, 113);
  }
  @media (min-width: 768px) {
    display: none;
  }
`;
