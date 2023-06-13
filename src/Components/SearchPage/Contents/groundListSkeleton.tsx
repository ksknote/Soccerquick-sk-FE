import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const GroundListSkeleton = () => {
  return (
    <tbody>
      <StyledSkeletonTr>
        <StyledSkeletonTd className="shimmer"></StyledSkeletonTd>
        <StyledSkeletonTd className="shimmer"></StyledSkeletonTd>
        <StyledSkeletonTd>
          <div className="shimmer"></div>
          <div className="shimmer"></div>
        </StyledSkeletonTd>

        <StyledSkeletonTd className="shimmer"></StyledSkeletonTd>
      </StyledSkeletonTr>
      <StyledSkeletonTr>
        <StyledSkeletonTd className="shimmer"></StyledSkeletonTd>
        <StyledSkeletonTd className="shimmer"></StyledSkeletonTd>
        <StyledSkeletonTd>
          <div className="shimmer"></div>
          <div className="shimmer"></div>
        </StyledSkeletonTd>

        <StyledSkeletonTd className="shimmer"></StyledSkeletonTd>
      </StyledSkeletonTr>
      <StyledSkeletonTr>
        <StyledSkeletonTd className="shimmer"></StyledSkeletonTd>
        <StyledSkeletonTd className="shimmer"></StyledSkeletonTd>
        <StyledSkeletonTd>
          <div className="shimmer"></div>
          <div className="shimmer"></div>
        </StyledSkeletonTd>

        <StyledSkeletonTd className="shimmer"></StyledSkeletonTd>
      </StyledSkeletonTr>
    </tbody>
  );
};

const loadingAnimation = keyframes`
    100% {
        background-position: -100% 0;
    }
`;

const StyledSkeletonTr = styled.tr`
  display: flex;
  align-items: center;
  height: 7rem;

  height: 10rem;
  margin: 1rem 1rem;
  border-bottom: 0.1rem solid #dddddd;
  .shimmer {
    background: linear-gradient(
      120deg,
      #e5e5e5 30%,
      #f0f0f0 38%,
      #f0f0f0 40%,
      #e5e5e5 48%
    );
    border-radius: 1rem;
    background-size: 200% 100%;
    background-position: 100% 0;
    animation: ${loadingAnimation} 1s infinite;
  }
`;

const StyledSkeletonTd = styled.td`
  border-radius: 1.5rem;
  margin: 2rem;
  :nth-child(1) {
    width: 3rem;
    height: 2rem;
  }
  :nth-child(2) {
    width: 8rem;
    height: 2rem;
  }
  :nth-child(3) {
    width: 60rem;
    div {
      :first-child {
        width: 50rem;
        height: 2.5rem;
        margin-bottom: 1rem;
      }
      :last-child {
        width: 30rem;
        height: 1.8rem;
      }
    }
  }
  :nth-child(4) {
    width: 10rem;
    height: 3.5rem;
  }
`;

export default GroundListSkeleton;
