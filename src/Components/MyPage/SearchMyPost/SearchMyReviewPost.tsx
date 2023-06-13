import react, { useState, useEffect } from 'react';
import MyPostTable from './MyPostTable';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/selectors/authSelectors';

export type ReviewPost = {
  review_id: string;
  comment: string;
  dom_id: string;
  createdAt: string;
  name: string;
  rating: number;
  userslikes: Array<string>;
  updatedAt: string;
};

function SearchMyReviewPost() {
  const [reviewList, setReviewList] = useState<ReviewPost[]>([]);
  const properties = ['작성자', '코멘트', '구장', '평점', '좋아요'];
  const user = useSelector(userSelector);
  const filteredItems = reviewList.filter(
    (item: ReviewPost) => item.name === '일반유저'
  );
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/reviews`, {
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
      reviewData={filteredItems}
    />
  );
}

export default SearchMyReviewPost;
