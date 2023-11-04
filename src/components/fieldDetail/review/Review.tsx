import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import WriteReview from './WriteReview';
import ReviewItemHeader from './ReviewItemHeader';
import ReviewItemBody from './ReviewItemBody';
import { ReviewDataType, ReviewProps } from '../../../types/ReviewType';
import { BoxContainer } from '../../../styles/styled-components/CommonStyle';

export default function Review({ review, dom_id }: ReviewProps) {
  const [reviewData, setReviewData] = useState<ReviewDataType[]>(review);
  const [sortedData, setSortedData] = useState<ReviewDataType[]>();

  useEffect(() => {
    const newSortedData = [...reviewData].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
    setSortedData(newSortedData);
  }, [reviewData]);

  return (
    <Wrapper>
      <Header>
        <h2>📄 리뷰 목록</h2>
      </Header>
      <WriteReview setReviewData={setReviewData} domId={dom_id} />
      {sortedData &&
        sortedData.map((item, index) => (
          <BoxContainer key={index}>
            <ReviewItemHeader reviewItem={item} />
            <ReviewItemBody
              reviewItem={item}
              reviewData={sortedData}
              setReviewData={setReviewData}
              domId={dom_id}
              index={index}
            />
          </BoxContainer>
        ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  > h2 {
    font-size: 1.6rem;
    font-weight: 600;
    margin: 0.6rem 0;
  }
  > span {
    padding: 1rem;
    font-size: 1.3rem;
    &:hover {
      cursor: pointer;
    }
  }
  @media (min-width: 1024px) {
    > h2 {
      font-size: 2rem;
    }
    > span {
      font-size: 1.4rem;
    }
  }
`;
