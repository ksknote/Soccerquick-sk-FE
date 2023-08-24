import React, { useState } from 'react';
import styled from 'styled-components';
import WriteReview from './WriteReview';
import ReviewItemHeader from './ReviewItemHeader';
import ReviewItemBody from './ReviewItemBody';
import { ReviewDataType, ReviewProps } from '../../../Types/ReviewType';

export default function Review({ review, dom_id }: ReviewProps) {
  const [reviewData, setReviewData] = useState<ReviewDataType[]>(review);
  return (
    <Wrapper>
      <Header>
        <h2>📄 리뷰 목록</h2>
        <span>좋아요 순</span>
      </Header>
      {reviewData &&
        reviewData.map((item, index) => (
          <ReivewLi key={index}>
            <ReviewItemHeader reviewItem={item} />
            <ReviewItemBody
              reviewItem={item}
              reviewData={reviewData}
              setReviewData={setReviewData}
              domId={dom_id}
              index={index}
            />
          </ReivewLi>
        ))}
      <WriteReview setReviewData={setReviewData} domId={dom_id} />
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
      font-size: 2.2rem;
      font-weight: 700;
    }
    > span {
      font-size: 1.4rem;
    }
  }
`;

const ReivewLi = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 1rem 0;
  background-color: white;
  filter: drop-shadow(0 0 3px #dddddd);
  border-radius: 10px;
  @media (min-width: 1024px) {
    padding: 2.5rem;
    margin: 2rem 0;
  }
`;
