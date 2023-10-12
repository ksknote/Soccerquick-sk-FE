import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../redux/modules/auth/selector';
import { ReviewDataType } from '../../../types/ReviewType';
import MyPageHeader from '../MyPageHeader';
import MobileHeader from '../../common/MobilePageHeader';
import EmptyBox from '../../common/EmptyBox';
import { BoxContainer } from '../../../styles/styled-components/CommonStyle';
import ReviewItemHeader from '../../fieldDetail/review/ReviewItemHeader';
import ReviewItemBody from '../../fieldDetail/review/ReviewItemBody';
import styled from 'styled-components';
import ReviewHeader from './ReviewHeader';

const config = {
  withCredentials: true,
};

function SearchMyReviewPost() {
  const [reviewData, setReviewData] = useState<ReviewDataType[]>([]);
  const user = useSelector(userSelector);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/reviews`, config)
      .then((res) => {
        const reviews = res.data.data;
        filterMyReview(reviews);
      })
      .catch((err) => console.log(err));
  }, []);

  const filterMyReview = (reviewData: ReviewDataType[]) => {
    const myReviews = reviewData.filter(
      (review) => review.user_name === user?.name
    );

    setReviewData(myReviews);
  };

  return (
    <>
      <MyPageHeader
        title="나의 경기장 리뷰"
        totalItemsCount={reviewData.length}
      />
      <MobileHeader title="나의 경기장 리뷰" />
      <BodyWrapper>
        {reviewData &&
          reviewData.map((review, index) => (
            <BoxContainer key={index}>
              <ReviewHeader dom_id={review.ground_id} />
              <ReviewItemHeader reviewItem={review} />
              <ReviewItemBody
                reviewItem={review}
                reviewData={reviewData}
                setReviewData={setReviewData}
                domId={review.dom_id}
                index={index}
              />
            </BoxContainer>
          ))}
      </BodyWrapper>
    </>
  );
}

export default SearchMyReviewPost;

const BodyWrapper = styled.div`
  padding: 1rem;
  width: 100%;
  max-width: 80rem;
  margin: auto;
`;
