import React from 'react';
import styled from 'styled-components';
function EmptyBox({ content }: { content: string }) {
  return <Wrapper>{content}</Wrapper>;
}

export default EmptyBox;

const Wrapper = styled.div`
  width: 100%;
  height: 20rem;
  background: #f0f5f0;
  border-radius: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  color: gray;
  @media (min-width: 1024px) {
    font-size: 1.6rem;
  }
`;
