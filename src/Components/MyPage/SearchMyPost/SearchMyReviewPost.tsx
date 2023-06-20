import { useState, useEffect } from 'react';
import MyPostTable from './MyPostTable';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../ReduxStore/modules/Auth/authSelectors';
import { changeReviewObjectToArray } from '../changeObjectToArray';

export type DomReviewType = {
  address: { area: string; fullAddress: string };
  dom_id: string;
  title: string;
  reviews: Array<ReviewPost>;
};

export type ReviewPost = {
  review_id: string;
  contents: string;
  ground_id: string;
  createdAt: string;
  user_name: string;
  likedreviews: Array<string>;
};

function SearchMyReviewPost() {
  const [reviewList, setReviewList] = useState<DomReviewType[]>([]);
  const properties = ['작성자', '코멘트', '구장', '지역', '좋아요'];
  const user = useSelector(userSelector);

  const filteredItems = reviewList
    .map((domInfo: DomReviewType) => {
      const reviews = domInfo.reviews.filter(
        (item: ReviewPost) => item.user_name === user?.name
      );
      if (reviews.length === 1) {
        const myReview = reviews[0];
        return changeReviewObjectToArray(domInfo, myReview);
      }
      return null;
    })
    .filter(Boolean);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/doms`, {
        withCredentials: true,
      })
      .then((res) => res.data.data)
      .then((result) => setReviewList(result))
      .catch((err) => console.log(err));
  }, []);

  return (
    <MyPostTable
      title="내 리뷰 글"
      properties={properties}
      data={filteredItems}
    />
  );
}

export default SearchMyReviewPost;
