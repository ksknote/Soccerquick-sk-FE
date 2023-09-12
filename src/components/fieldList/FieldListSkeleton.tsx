import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Skeleton from '../commons/Skeleton';

const FieldListSkeleton = () => {
  return (
      <Item>
        <Skeleton height='2rem' width='50%' />
        <Skeleton height='2rem' width= '70%'/>
        <div>
          <Skeleton height='2.5rem' width='90%' />
          <Skeleton height='1.5rem' width='70%' />
        </div>
        <Skeleton height='3rem' width='60%' />
      </Item>
  );
};

const Item = styled.div`
display: grid;
grid-template-columns: 3fr 0 10fr 0;
height: 11rem;
border-bottom: 0.1rem solid #dddddd;
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}
> span {
  display: flex;
  align-items: center;
  margin: auto;
}

@media (min-width: 768px) {
  grid-template-columns: 1.2fr 2fr 10fr 3fr;
  gap: 2rem;

}
`


export default FieldListSkeleton;
