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
  const [selectedEditImage, setSelectedEditImage] = useState<File>();
  const [isChagedOriginalImage, setIsChangedOriginalImage] = useState(false);

  const handleSetReviewImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'new') {
        console.log('new');
        setSelectedImage(file);
      }
      if (type === 'edit') {
        console.log('edit!');
        setSelectedEditImage(file);
      }
    } else {
      alertModal('이미지를 선택해주세요.', 'warning');
    }
  };

  useEffect(() => {}, [reviewData]);

  async function handleEditReview(
    index: number,
    reviewId: string | undefined,
    imageUrl: string | undefined
  ) {
    console.log(imageUrl);
    if (isReviewEditable) {
      handleSubmitReview(index, reviewId, imageUrl);
    } else {
      if (imageUrl) {
        const image = await fetch(imageUrl); // 이미지 데이터 가져오기
        const blob = await image.blob();
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
        setSelectedEditImage(file);
      }
      setEditReview(reviewData[index].contents || '');
      setIsReviewEditable(true);
    }
  }

  async function handleSubmitReview(
    index: number,
    reviewId: string | undefined,
    imageUrl: string | undefined
  ) {
    if (editReview === '') {
      return alertModal('내용을 입력해주세요!', 'warning');
    }

    let image: string | undefined;
    if (selectedEditImage || (imageUrl && !selectedEditImage)) {
      image = await setImage('edit');
      console.log(image);
    }

    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/reviews/${reviewId}`,
        {
          contents: editReview,
          domId,
          image,
        },
        config
      )
      .then((res) => {
        if (res.status === 200) {
          const newReviewData = [...reviewData];
          newReviewData[index].contents = editReview;
          if (image) {
            newReviewData[index].image = image;
          }
          setReviewData(newReviewData);
          setSelectedEditImage(undefined);
          setIsReviewEditable(false);
        }
      })
      .catch((error) => {
        console.error(error);
        alertModal('수정에 실패하였습니다.', 'error');
      });
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

    let image = await setImage('new');

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/reviews`,
        {
          user_id: userId,
          dom_id: domId,
          contents: review,
          image,
        },
        config
      )
      .then((res) => {
        setReview('');
        setSelectedImage(undefined);
        // 리뷰를 등록한 후에 서버로부터 최신 댓글 목록을 다시 가져옴
        axios
          .get(`${process.env.REACT_APP_API_URL}/doms/${domId}`, config)
          .then((res) => {
            setReviewData(res.data.data.reviews);
          });
      });
  }

  async function setImage(type: string) {
    let imageUrl = '';
    if (type === 'new' && selectedImage) {
      imageUrl = await uploadImage(selectedImage);
    } else if (type === 'edit' && selectedEditImage) {
      imageUrl = await uploadImage(selectedEditImage);
    }
    return imageUrl;
  }

  async function uploadImage(image: File) {
    let imageUrl;
    const formData = new FormData();
    formData.append('image', image);
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
    return imageUrl;
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
          <TextAreaContainer>
            {item.user_name === userName && isReviewEditable ? (
              <>
                <TextArea
                  placeholder="수정 내용을 입력하세요"
                  value={editReview}
                  onChange={(e) => {
                    setEditReview(e.target.value);
                  }}
                />
                {selectedEditImage && (
                  <SelectedImageContainer>
                    <SelectedReviewImage>
                      <img
                        src={
                          selectedEditImage &&
                          URL.createObjectURL(selectedEditImage)
                        }
                        alt="profile"
                      />
                      <button
                        onClick={() => {
                          setSelectedEditImage(undefined);
                        }}
                      >
                        <span>×</span>
                      </button>
                    </SelectedReviewImage>
                  </SelectedImageContainer>
                )}
              </>
            ) : (
              <ReviewContents>{item.contents}</ReviewContents>
            )}
          </TextAreaContainer>
          {item.image && !isReviewEditable && (
            <img className="review-image" src={item.image} alt="reivewImage" />
          )}
          {isLogin && item.user_name === userName && (
            <ButtonContainer>
              {isReviewEditable && (
                <>
                  <InputTypeFileLabel htmlFor="reviewEditImageFile">
                    <img src={ImageIcon} alt="imageIcon" />
                  </InputTypeFileLabel>
                  <InputTypeFile
                    type="file"
                    id="reviewEditImageFile"
                    onChange={(e) => handleSetReviewImage(e, 'edit')}
                    accept="image/*"
                  />
                </>
              )}
              <div className="review-content-buttons">
                {isReviewEditable ? (
                  <button
                    onClick={() => {
                      setIsReviewEditable(!isReviewEditable);
                      setEditReview('');
                      setSelectedEditImage(undefined);
                    }}
                  >
                    취소
                  </button>
                ) : (
                  <button
                    className="review-delete"
                    onClick={() => handleDeleteReview(index, item.review_id)}
                  >
                    삭제
                  </button>
                )}
                <button
                  className="review-edit"
                  onClick={() => {
                    handleEditReview(index, item.review_id, item.image);
                  }}
                >
                  {isReviewEditable ? '완료' : '수정'}
                </button>
              </div>
            </ButtonContainer>
          )}
        </StyledReviews>
      ))}
      <StyledWriteReview>
        <TextAreaContainer>
          <TextArea
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
        </TextAreaContainer>
        <ButtonContainer>
          <InputTypeFileLabel htmlFor="reviewImageFile">
            <img src={ImageIcon} alt="imageIcon" />
          </InputTypeFileLabel>
          <InputTypeFile
            type="file"
            id="reviewImageFile"
            onChange={(e) => handleSetReviewImage(e, 'new')}
            accept="image/*"
          />
          <button className="write-review-button" onClick={handleWriteReview}>
            작성 완료
          </button>
        </ButtonContainer>
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

const TextArea = styled.textarea`
  width: 100%;
  height: 70%;
  border: none;
  resize: none; /* 크기 조정 비활성화 */
  padding: 1rem;
  font-size: 1.3rem;

  :focus {
    outline: none;
  }
`;

const ReviewContents = styled.div`
  font-size: 1.3rem;
`;

const StyledWriteReview = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin-top: 1rem;
  background-color: white;
  filter: drop-shadow(0 0 3px #dddddd);
  border-radius: 10px;

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

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
