import React from 'react';
import styled from 'styled-components';
import loadingGif from '../../assets/icon/loading.gif';

function Loading() {
  return (
    <Wrapper>
      <img src={loadingGif} alt="loading" />
    </Wrapper>
  );
}

export default Loading;

const Wrapper = styled.div`
  display: flex;
  height: 10rem;
  justify-content: center;
  align-items: center;
  img {
    width: 5rem;
    height: 5rem;
  }
  @media (min-width: 1024px) {
    height: 20rem;
  }
`;
