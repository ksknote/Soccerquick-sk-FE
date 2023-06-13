import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import LikeButton from '../Commons/LikeButton';
import {
  isLogInSelector,
  userSelector,
} from '../../store/selectors/authSelectors';

interface ReviewProps {
  dom_id: string;
  reviewData: reviewData[];
}

interface reviewData {
  user_name?: string;
  user_icon?: string;
  review_id?: string;
  contents?: string;
  likedreviews: string[];
}

const config = {
  withCredentials: true,
};

export default function Review(props: ReviewProps) {
  const [reviewData, setReviewData] = useState<reviewData[]>(props.reviewData);
  const [review, setReview] = useState<string>('');
  const [editReview, setEditReview] = useState<string>('');
  const [isReviewEditable, setIsReviewEditable] = useState<boolean>(false);
  const isLogin = useSelector(isLogInSelector);
  const userData = useSelector(userSelector);
  const userId = userData?.user_id;
  const userName = userData?.name || ''; // 빈 문자열로 대체
  const domId = props.dom_id;

  // url 주소 수정 필요
  useEffect(() => {}, [reviewData]);

  function handleEditReview(index: number, reviewId: string | undefined) {
    if (isReviewEditable) {
      if (editReview === '') {
        return alert('내용을 입력해주세요!');
      }

      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/reviews/${reviewId}`,
          {
            contents: editReview,
            domId,
          },
          config
        )
        .then((res) => {
          if (res.status === 200) {
            const newReviewData = [...reviewData];
            newReviewData[index].contents = editReview;
            setReviewData(newReviewData);
            setIsReviewEditable(false);
          }
        })
        .catch((error) => {
          console.error(error);
          alert('수정에 실패하였습니다.');
        });
    } else {
      setEditReview(reviewData[index].contents || '');
      setIsReviewEditable(true);
    }
  }

  function handleDeleteReview(index: number, reviewId: string | undefined) {
    const confirmed = window.confirm('삭제하시겠습니까?');

    confirmed &&
      axios
        .delete(`${process.env.REACT_APP_API_URL}/reviews/${reviewId}`, {
          data: { domId },
          ...config,
        })
        .then((res) => {
          if (res.status === 204) {
            const newReviewData = [...reviewData];
            newReviewData.splice(index, 1);
            setReviewData(newReviewData);
          }
        });
  }

  function handleWriteReview() {
    if (!isLogin) {
      return alert('로그인이 필요한 서비스입니다.');
    }
    if (review === '') {
      return alert('내용을 입력해주세요!');
    }

    // 작성한 리뷰가 이미 존재하는지 검사
    const existingReview = reviewData.find(
      (item) => item.user_name === userName
    );
    if (existingReview) {
      return alert('1인당 1개의 리뷰만 작성 가능합니다.');
    }

    // 작성한 리뷰를 서버에 등록
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/reviews`,
        {
          user_id: userId,
          dom_id: domId,
          contents: review,
        },
        config
      )
      .then((res) => {
        setReview('');
        // 리뷰를 등록한 후에 서버로부터 최신 댓글 목록을 다시 가져옴
        axios
          .get(`${process.env.REACT_APP_API_URL}/doms/${domId}`, config)
          .then((res) => {
            setReviewData(res.data.data.reviews);
          });
      });
  }

  return (
    <StyledReviewContainer>
      <h2>📄 리뷰 목록</h2>
      {reviewData.map((item, index) => (
        <StyledReviews key={index}>
          <div className="review-header">
            <span className="user-info">
              <span>
                <img className="user-icon" src={item.user_icon} alt="avatar" />
              </span>
              <span className="user-name">{item.user_name}</span>
            </span>
            <span className="likes">
              <LikeButton
                likedreviews={item.likedreviews}
                reviewId={item.review_id}
              />
            </span>
          </div>
          <div className="review-content">
            {item.user_name === userName && isReviewEditable ? (
              <input
                className="review"
                value={editReview}
                onChange={(e) => {
                  setEditReview(e.target.value);
                }}
              />
            ) : (
              <span className="review">{item.contents}</span>
            )}
          </div>
          {isLogin && item.user_name === userName && (
            <div className="review-content-buttons">
              <button
                className="review-edit"
                onClick={() => {
                  setIsReviewEditable(!isReviewEditable);
                  handleEditReview(index, item.review_id);
                }}
              >
                {isReviewEditable ? '완료' : '수정'}
              </button>
              <button
                className="review-delete"
                onClick={() => handleDeleteReview(index, item.review_id)}
              >
                삭제
              </button>
            </div>
          )}
        </StyledReviews>
      ))}
      <StyledWriteReview>
        <div className="textarea-container">
          <textarea
            placeholder="리뷰 내용을 입력하세요"
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
        </div>
        <div className="button-container">
          <button className="review-btn" onClick={handleWriteReview}>
            작성 완료
          </button>
        </div>
      </StyledWriteReview>
    </StyledReviewContainer>
  );
}

const StyledReviewContainer = styled.div`
  display: flex;
  flex-direction: column;

  > h2 {
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0.6rem 0;
  }
`;

const StyledReviews = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 2rem 0;
  background-color: white;
  filter: drop-shadow(0 0 3px #dddddd);
  border-radius: 10px;

  .review-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .user-info {
    margin-bottom: 1rem;
  }

  .user-icon {
    width: 3rem;
    height: auto;
  }

  .review-content {
    display: flex;
    flex-direction: row;
    padding-left: 1rem;
    margin-bottom: 1rem;
  }

  .review-content-buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .review-edit {
    margin-right: 1rem;
    font-size: 1rem;
  }

  .review-delete {
    font-size: 1rem;
  }
`;

const StyledWriteReview = styled.div`
  display: flex;
  flex-direction: column;
  height: 25rem;
  padding: 2rem;
  margin-top: 2rem;
  background-color: white;
  filter: drop-shadow(0 0 3px #dddddd);
  border-radius: 10px;

  .textarea-container {
    position: relative;
    flex: 1; /* textarea가 컨테이너에 꽉 차도록 설정 */
  }

  textarea {
    width: 100%;
    height: 80%;
    border: none;
    resize: none; /* 크기 조정 비활성화 */
  }

  .button-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    .add-img-btn {
      margin-right: 1rem;
    }
  }

  .image-container {
    max-width: 20%;
    max-height: 10rem; /* 원하는 높이로 조정 */
    overflow: hidden;
    margin-top: 1rem; /* 이미지와 textarea 사이에 간격 추가 */
  }

  .selected-image {
    width: 100%;
    height: auto;
  }
`;
