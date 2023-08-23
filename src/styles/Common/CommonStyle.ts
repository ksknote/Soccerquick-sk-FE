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
