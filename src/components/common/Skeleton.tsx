import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface SkeletonPropsType {
  width?: string;
  height?: string;
  margin?: string;
  borderRadius?: string;
}

function Skeleton({ width, height, margin, borderRadius }: SkeletonPropsType) {
  const [isSkeletonVisible, setIsSkeletonVisible] = useState(false);

  //깜빡임 방지
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setIsSkeletonVisible(true);
  //   }, 500);
  //   return () => clearTimeout(timeoutId);
  // }, []);
  return (
    <SkeletonLine
      style={{ width, height, margin, borderRadius }}
      visible={true}
    ></SkeletonLine>
  );
}

export default Skeleton;

const loadingAnimation = keyframes`
    100% {
        background-position: -100% 0;
    }
`;

export const Shining = styled.span`
  background: linear-gradient(
    120deg,
    #e5e5e5 30%,
    #f0f0f0 38%,
    #f0f0f0 40%,
    #e5e5e5 48%
  );
  background-size: 200% 100%;
  background-position: 100% 0;
  animation: ${loadingAnimation} 1s infinite;
`;

const SkeletonLine = styled(Shining)<{ visible: boolean }>`
  height: 1.5rem;
  border-radius: 1rem;
  display: inline-block;
  background: ${({ visible }) => !visible && 'white'};
`;
