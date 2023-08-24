import React, { useState } from 'react';
import styled from 'styled-components';
import { ReviewItemPropsType } from '../../../Types/ReviewType';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  isLogInSelector,
  userSelector,
} from '../../../ReduxStore/modules/Auth/authSelectors';
import uploadImage from '../../../Utils/uploadImage';
import alertModal from '../../Commons/alertModal';
import ImageIcon from '../../../styles/icon/ImageIcon.svg';

function ReviewItemBody(Props: ReviewItemPropsType) {
  const { reviewItem, reviewData, setReviewData, domId, index } = Props;
  const { review_id, user_name, contents, image } = reviewItem;
  const [isReviewEditable, setIsReviewEditable] = useState<boolean>(false);
  const [selectedEditImage, setSelectedEditImage] = useState<File>();
  const [editReview, setEditReview] = useState<string>('');
  const isLogin = useSelector(isLogInSelector);
  const userData = useSelector(userSelector);
  const userName = userData?.name || '';
  const config = { withCredentials: true };

  const handleSetReviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      alertModal('이미지를 선택해주세요.', 'warning');
    }
    setSelectedEditImage(file);
  };

  async function handleClickEdit(index: number, imageUrl: string | undefined) {
    if (imageUrl) {
      const image = await fetch(imageUrl); // 이미지 데이터 가져오기
      const blob = await image.blob();
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
      setSelectedEditImage(file);
    }
    setEditReview(reviewData[index].contents || '');
    setIsReviewEditable(true);
  }

  async function handleFetchEditReview(
    index: number,
    reviewId: string | undefined,
    imageUrl: string | undefined
  ) {
    if (editReview === '') {
      return alertModal('내용을 입력해주세요!', 'warning');
    }

    let image: string | undefined;
    if (selectedEditImage || (imageUrl && !selectedEditImage)) {
      image = await uploadImage(selectedEditImage);
    }
    const data = { contents: editReview, domId, image };
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/reviews/${reviewId}`,
        data,
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
    const header = {
      data: { domId },
      ...config,
    };
    if (confirmed) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/reviews/${reviewId}`, header)
        .then((res) => {
          if (res.status === 204) {
            const newReviewData = [...reviewData];
            newReviewData.splice(index, 1);
            setReviewData(newReviewData);
            alertModal('리뷰가 삭제되었습니다.', 'success');
          }
        });
    }
  }

  if (isReviewEditable) {
    return (
      <>
        <ReviewBody>
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
                    selectedEditImage && URL.createObjectURL(selectedEditImage)
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
        </ReviewBody>
        <WriteReviewFooter>
          <div>
            <InputTypeFileLabel htmlFor="reviewEditImageFile">
              <img src={ImageIcon} alt="imageIcon" />
            </InputTypeFileLabel>
            <InputTypeFile
              type="file"
              id="reviewEditImageFile"
              onChange={(e) => handleSetReviewImage(e)}
              accept="image/*"
            />
          </div>
          <ButtonContainer>
            <Button
              onClick={() => {
                setIsReviewEditable(false);
                setEditReview('');
                setSelectedEditImage(undefined);
              }}
            >
              취소
            </Button>
            <Button
              onClick={() => {
                handleFetchEditReview(
                  index,
                  reviewItem.review_id,
                  reviewItem.image
                );
              }}
            >
              완료
            </Button>
          </ButtonContainer>
        </WriteReviewFooter>
      </>
    );
  }

  return (
    <>
      <ReviewBody>
        <ReviewContents>{contents}</ReviewContents>
        {image && !isReviewEditable && (
          <ReviewImage src={image} alt="reivewImage" />
        )}
      </ReviewBody>
      {isLogin && user_name === userName && (
        <ReviewFooter>
          <ButtonContainer>
            <Button onClick={() => handleDeleteReview(index, review_id)}>
              삭제
            </Button>
            <Button
              onClick={() => {
                handleClickEdit(index, image);
              }}
            >
              수정
            </Button>
          </ButtonContainer>
        </ReviewFooter>
      )}
    </>
  );
}

export default ReviewItemBody;

export const ReviewBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ReviewContents = styled.div`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  @media (min-width: 1024px) {
    font-size: 1.6rem;
  }
`;

const ReviewImage = styled.img`
  max-width: 40rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 70%;
  border: none;
  resize: none; /* 크기 조정 비활성화 */
  padding: 1rem 0;
  font-size: 1.3rem;

  :focus {
    outline: none;
  }
  @media (min-width: 1024px) {
    font-size: 1.6rem;
  }
`;

export const SelectedImageContainer = styled.div`
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

export const SelectedReviewImage = styled.div`
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

const ReviewFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-top: 1rem;
`;

export const WriteReviewFooter = styled(ReviewFooter)`
  justify-content: space-between;
`;

export const InputTypeFileLabel = styled.label`
  cursor: pointer;
  img {
    width: 2.2rem;
    @media (min-width: 1024px) {
      width: 3rem;
      height: 3rem;
    }
  }
`;

export const InputTypeFile = styled.input`
  display: none;
`;

export const ButtonContainer = styled.div`
  button:last-child {
    margin-left: 0.5rem;
  }
`;

export const Button = styled.button`
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
  @media (min-width: 1024px) {
    font-size: 1.5rem;
    padding: 1rem 2rem;
    border-radius: 5px;
  }
`;
