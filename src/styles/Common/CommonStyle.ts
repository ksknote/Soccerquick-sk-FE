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
