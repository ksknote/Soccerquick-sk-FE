import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import LikeButton from '../Commons/LikeButton';
import alertModal from '../Commons/alertModal';
import ImageIcon from '../../styles/icon/ImageIcon.svg';
import {
  isLogInSelector,
  userSelector,
} from '../../ReduxStore/modules/Auth/authSelectors';

interface ReviewProps {
  dom_id: string;
  reviewData: reviewData[];
}

interface reviewData {
  user_name?: string;
  user_icon?: string;
  review_id?: string;
  contents?: string;
  createdAt?: string;
  likedreviews: string[];
  image: string;
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
  const [selectedImage, setSelectedImage] = useState<File>();

  const handleSetReviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    } else {
      alertModal('이미지를 선택해주세요.', 'warning');
    }
  };

  useEffect(() => {}, [reviewData]);

  function handleEditReview(index: number, reviewId: string | undefined) {
    if (isReviewEditable) {
      if (editReview === '') {
        return alertModal('내용을 입력해주세요!', 'warning');
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
          alertModal('수정에 실패하였습니다.', 'error');
        });
    } else {
      setEditReview(reviewData[index].contents || '');
      setIsReviewEditable(true);
    }
  }

  async function handleDeleteReview(
    index: number,
    reviewId: string | undefined
  ) {
    const confirmed = await alertModal('삭제하시겠습니까?', 'submit');

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

  async function handleWriteReview() {
    if (!isLogin) {
      return alertModal('로그인이 필요한 서비스입니다.', 'warning');
    }
    if (review === '') {
      return alertModal('내용을 입력해주세요!', 'warning');
    }

    // 작성한 리뷰가 이미 존재하는지 검사
    const existingReview = reviewData.find(
      (item) => item.user_name === userName
    );
    if (existingReview) {
      return alertModal('1개의 리뷰만 작성 가능합니다.', 'warning');
    }

    // 작성한 리뷰를 서버에 등록
    let imageUrl = '';

    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/communities/uploads`,
          formData,
          { withCredentials: true }
        );
        imageUrl = res.data.data;
      } catch (e) {
        console.log(e);
        alertModal('지원하지 않는 파일 형식입니다.', 'warning');
      }
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/reviews`,
        {
          user_id: userId,
          dom_id: domId,
          contents: review,
          image: imageUrl,
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
      <div className="review-header">
        <h2>📄 리뷰 목록</h2>
        <span>좋아요 순</span>
      </div>
      {reviewData.map((item, index) => (
        <StyledReviews key={index}>
          <div className="review-contents-header">
            <span className="user-info">
              <span>
                <img className="user-icon" src={item.user_icon} alt="avatar" />
              </span>
              <span className="user-name">
                <p>{item.user_name}</p>
                <p className="review-time">
                  {item.createdAt &&
                    new Date(item.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                </p>
              </span>
            </span>
            <span className="likes">
              <LikeButton
                likedreviews={item.likedreviews}
                reviewId={item.review_id}
                isLogin={isLogin}
              />
            </span>
          </div>
          <div className="review-content">
            {item.user_name === userName && isReviewEditable ? (
              <textarea
                className="review-edit-textarea"
                placeholder="수정 내용을 입력하세요"
                value={editReview}
                onChange={(e) => {
                  setEditReview(e.target.value);
                }}
              />
            ) : (
              <span className="review">{item.contents}</span>
            )}
          </div>
          {item.image && (
            <img className="review-image" src={item.image} alt="reivewImage" />
          )}
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
            className="write-review-textarea"
            placeholder="리뷰 내용을 입력하세요"
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
          {selectedImage && (
            <SelectedImageContainer>
              <SelectedReviewImage>
                <img
                  src={selectedImage ? URL.createObjectURL(selectedImage) : ''}
                  alt="profile"
                />
                <button onClick={() => setSelectedImage(undefined)}>
                  <span>×</span>
                </button>
              </SelectedReviewImage>
            </SelectedImageContainer>
          )}
        </div>
        <div className="button-container">
          <InputTypeFileLabel htmlFor="reviewImageFile">
            <img src={ImageIcon} alt="imageIcon" />
          </InputTypeFileLabel>
          <InputTypeFile
            type="file"
            id="reviewImageFile"
            onChange={handleSetReviewImage}
            accept="image/*"
          />
          <button className="write-review-button" onClick={handleWriteReview}>
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

  .review-header {
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
  }
`;

const StyledReviews = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 1rem 0;
  background-color: white;
  filter: drop-shadow(0 0 3px #dddddd);
  border-radius: 10px;

  .review-contents-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .user-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2rem;
  }

  .user-icon {
    width: 4rem;
    height: 4rem;
    margin-right: 1rem;
    border-radius: 5rem;
  }

  .user-name {
    font-size: 1.4rem;
    font-weight: 500;
  }

  .review-time {
    font-size: 1.1rem;
    font-weight: 400;
  }

  .review-content {
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  .review-image {
    max-width: 40rem;
  }

  .review-edit-textarea {
    width: 100%;
    height: 8rem;
    padding: 1rem;
    border: none;
    resize: none;
    font-size: 1.7rem;

    :focus {
      border: 1.5px solid #dddddd;
      border-radius: 1rem;
      box-shadow: 1px 1px 10px #efefef;
      outline: none;
    }
  }

  .review-content-buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 1rem;

    .review-edit {
      font-size: 1.2rem;
      padding: 0.5rem 1rem;
      margin-right: 1rem;
      border: 0.5px solid #cfcfcf;
      border-radius: 5px;
      background-color: white;

      &:hover {
        background-color: #e7e7e7;
      }
    }

    .review-delete {
      font-size: 1.2rem;
      padding: 0.5rem 1rem;
      border: 0.5px solid #cfcfcf;
      border-radius: 5px;
      background-color: white;

      &:hover {
        background-color: #eeeeee;
      }
    }
  }
  @media (min-width: 1024px) {
    margin: 2rem 0;

    .user-name {
      font-size: 1.7rem;
    }

    .review-time {
      font-size: 1.3rem;
    }
    .review-content {
      font-size: 1.7rem;
    }
  }
`;

const StyledWriteReview = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin-top: 1rem;
  background-color: white;
  filter: drop-shadow(0 0 3px #dddddd);
  border-radius: 10px;

  .textarea-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
  }

  .write-review-textarea {
    width: 100%;
    height: 70%;
    border: none;
    resize: none; /* 크기 조정 비활성화 */
    padding: 1rem;
    font-size: 1.3rem;

    :focus {
      outline: none;
    }
  }

  .button-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .write-review-button {
    font-size: 1.3rem;
    padding: 0.7rem 1.3rem;
    border: 0.5px solid #cfcfcf;
    border-radius: 5px;
    background-color: white;
    color: #09cf00;

    &:hover {
      background-color: #09cf00;
      color: white;
    }
  }
  @media (min-width: 1024px) {
    height: 20rem;
    margin-top: 2rem;
    .write-review-textarea {
      height: 70%;
      padding: 1rem;
      font-size: 1.7rem;
    }
    .write-review-button {
      font-size: 1.5rem;
      padding: 1rem 2rem;
      border-radius: 5px;
    }
  }
`;
const SelectedImageContainer = styled.div`
  button {
    position: absolute;
    top: -1rem;
    right: -1rem;
    width: 2.2rem;
    height: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    font-size: 1.4rem;
    color: grey;
    background: white;
    box-sizing: border-box;
    border: 0.1rem solid grey;
    border-radius: 100%;
  }
`;
const SelectedReviewImage = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;
  border: 0.1rem solid #e6e6e6;
  margin: 1rem 0;
  img {
    width: 100%;
    height: 100%;
  }
  @media (min-width: 768px) {
    width: 8rem;
    height: 8rem;
  }
`;

const InputTypeFileLabel = styled.label`
  width: 2.2rem;
  cursor: pointer;
`;

const InputTypeFile = styled.input`
  display: none;
`;
