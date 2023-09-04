import React, { useState } from 'react';
import styled from 'styled-components';
import { ReviewItemPropsType } from '../../../types/ReviewType';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  isLogInSelector,
  userSelector,
} from '../../../redux/modules/Auth/authSelectors';
import uploadImage from '../../../utils/uploadImage';
import alertModal from '../../Commons/alertModal';
import ImageIcon from '../../../styles/icon/ImageIcon.svg';
import { Comment } from '../../../styles/Common/CommentStyle';
import { Button } from '../../../styles/Common/CommonStyle';

function ReviewItemBody(Props: ReviewItemPropsType) {
  const { reviewItem, reviewData, setReviewData, domId, index } = Props;
  const { review_id, user_name, contents, image } = reviewItem;
  const [isReviewEditable, setIsReviewEditable] = useState<boolean>(false);
  const [selectedEditImage, setSelectedEditImage] = useState<File>();
  const [isImageChanged, setIsImageChanged] = useState(false);

  const [editReview, setEditReview] = useState<string>('');
  const isLogin = useSelector(isLogInSelector);
  const userData = useSelector(userSelector);
  const userName = userData?.name || '';
  const config = { withCredentials: true };

  const setImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      alertModal('이미지를 선택해주세요.', 'warning');
    }
    setSelectedEditImage(file);
    setIsImageChanged(true);
  };

  async function setEditableHandler(
    index: number,
    imageUrl: string | undefined
  ) {
    if (imageUrl) {
      const image = await fetch(imageUrl); // 이미지 데이터 가져오기
      const blob = await image.blob();
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
      setSelectedEditImage(file);
    }
    setEditReview(reviewData[index].contents || '');
    setIsReviewEditable(true);
  }

  async function editReviewHandler(
    index: number,
    reviewId: string | undefined,
    imageUrl: string | undefined
  ) {
    if (editReview === '') {
      return alertModal('내용을 입력해주세요!', 'warning');
    }
    let image: string | undefined;
    if (selectedEditImage && isImageChanged) {
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
      .catch((e) => {
        if (e.response.data.statusCode === 500) {
          alertModal('리뷰 수정에 실패했습니다.', 'error');
        } else {
          alertModal(e.response.data.message, 'warning');
        }
        console.error(e);
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
        })
        .catch((e) => {
          if (e.response.data.statusCode === 500) {
            alertModal('댓글 삭제에 실패했습니다.', 'error');
          } else {
            alertModal(e.response.data.message, 'warning');
          }
          console.error(e);
        });
    }
  }

  if (isReviewEditable) {
    return (
      <>
        <Comment.Body>
          <Comment.TextArea
            placeholder="수정 내용을 입력하세요"
            value={editReview}
            onChange={(e) => {
              setEditReview(e.target.value);
            }}
          />
          {selectedEditImage && (
            <Comment.SelectedImageContainer>
              <Comment.SelectedImage>
                <img
                  src={
                    selectedEditImage && URL.createObjectURL(selectedEditImage)
                  }
                />
                <button
                  onClick={() => {
                    setSelectedEditImage(undefined);
                  }}
                >
                  <span>×</span>
                </button>
              </Comment.SelectedImage>
            </Comment.SelectedImageContainer>
          )}
        </Comment.Body>
        <Comment.SpaceBetweenFooter>
          <div>
            <Comment.InputTypeFileLabel htmlFor="reviewEditImageFile">
              <img src={ImageIcon} alt="imageIcon" />
            </Comment.InputTypeFileLabel>
            <Comment.InputTypeFile
              type="file"
              id="reviewEditImageFile"
              onChange={(e) => setImageHandler(e)}
              accept="image/*"
            />
          </div>
          <div>
            <Button.WhiteSmall
              onClick={() => {
                setIsReviewEditable(false);
                setEditReview('');
                setSelectedEditImage(undefined);
              }}
            >
              취소
            </Button.WhiteSmall>
            <Button.GreenSmall
              onClick={() => {
                editReviewHandler(
                  index,
                  reviewItem.review_id,
                  reviewItem.image
                );
              }}
            >
              완료
            </Button.GreenSmall>
          </div>
        </Comment.SpaceBetweenFooter>
      </>
    );
  }

  return (
    <>
      <Comment.Body>
        <Comment.ContentsWrapper>
          <Comment.Contents>{contents}</Comment.Contents>
          {image && !isReviewEditable && (
            <Comment.Image>
              <img src={image} />
            </Comment.Image>
          )}
        </Comment.ContentsWrapper>
      </Comment.Body>
      {isLogin && user_name === userName && (
        <Comment.ButtonsFooter>
          <Button.WhiteSmall
            onClick={() => handleDeleteReview(index, review_id)}
          >
            삭제
          </Button.WhiteSmall>
          <Button.GreenSmall
            onClick={() => {
              setEditableHandler(index, image);
            }}
          >
            수정
          </Button.GreenSmall>
        </Comment.ButtonsFooter>
      )}
    </>
  );
}

export default ReviewItemBody;
