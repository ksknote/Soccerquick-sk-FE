import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 120rem;
  height: 100%;
  min-height: 100vh;
  margin: auto;
  padding-bottom: 8rem;
  @media (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

export const BodyWrapper = styled(Wrapper)`
  padding: 2rem;
  @media (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

export const BoxContainer = styled.div`
  padding: 2rem;
  background-color: white;
  border-radius: 1.5rem;
  filter: drop-shadow(0 0 0.2rem #c6c6c6);
  :not(first-child) {
    margin-top: 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 2rem;
  }
`;

export const Cell = styled.div`
  display: inline;
  padding: 0.1rem 1rem 0.1rem 1rem;
  margin-right: 0.5rem;
  border: 0.1rem solid #eeeeee;
  border-radius: 2rem;
  font-size: 1.1rem;
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BigButton = styled.button`
  border-radius: 0.8rem;
  background-color: var(--color--green);
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
  margin-left: 1rem;
  padding: 0.7rem 1.2rem;
  @media (min-width: 768px) {
    font-size: 1.6rem;
    padding: 0.9rem 1.8rem;
  }
  @media (min-width: 1024px) {
    font-size: 1.7rem;
    padding: 1rem 2rem;
  }
`;

const SmallButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 0.7rem;
  background-color: var(--color--green);
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  img {
    width: 1.5rem;
    vertical-align: middle;
    padding: 0 0.3rem 0.2rem 0;
  }
  @media (min-width: 1024px) {
    font-size: 1.5rem;
    padding: 0.6rem 1.3rem;

    img {
      width: 2rem;
    }
  }
`;

export const Button = {
  GreenBig: styled(BigButton)``,
  WhiteBig: styled(BigButton)`
    color: var(--color--green);
    background: white;
    border: 0.1rem solid #dddcdc;
  `,
  GreenSmall: styled(SmallButton)``,
  WhiteSmall: styled(SmallButton)`
    background-color: white;
    color: #787878;
    filter: drop-shadow(0 0 0.1rem grey);
  `,
};
