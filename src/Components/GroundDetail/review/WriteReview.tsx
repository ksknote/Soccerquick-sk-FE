import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { WriteReviewPropsType } from '../../../Types/ReviewType';
import {
  isLogInSelector,
  userSelector,
} from '../../../ReduxStore/modules/Auth/authSelectors';
import ImageIcon from '../../../styles/icon/ImageIcon.svg';
import alertModal from '../../Commons/alertModal';
import uploadImage from '../../../Utils/uploadImage';
import axios from 'axios';
import { Comment } from '../../../styles/Common/CommentStyle';
import { BoxContainer, Button } from '../../../styles/Common/CommonStyle';

function WriteReview({ setReviewData, domId }: WriteReviewPropsType) {
  const isLogin = useSelector(isLogInSelector);
  const userData = useSelector(userSelector);
  const userId = userData?.user_id;
  const [newReview, setNewReview] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File>();

  const handleSetReviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      alertModal('이미지를 선택해주세요.', 'warning');
      return;
    }
    setSelectedImage(file);
  };

  async function handleWriteReview() {
    if (!isLogin) {
      return alertModal('로그인이 필요한 서비스입니다.', 'warning');
    }
    if (newReview === '') {
      return alertModal('내용을 입력해주세요!', 'warning');
    }
    const image = await uploadImage(selectedImage);
    const config = { withCredentials: true };
    const data = {
      user_id: userId,
      dom_id: domId,
      contents: newReview,
      image,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/reviews`, data, config)
      .then((res) => {
        setNewReview('');
        setSelectedImage(undefined);
        // 리뷰를 등록한 후에 서버로부터 최신 댓글 목록을 다시 가져옴
        axios
          .get(`${process.env.REACT_APP_API_URL}/doms/${domId}`, config)
          .then((res) => {
            setReviewData(res.data.data.reviews);
          });
      });
  }

  return (
    <BoxContainer>
      <Comment.Body>
        <Comment.TextArea
          placeholder="리뷰 내용을 입력하세요"
          value={newReview}
          onChange={(e) => {
            setNewReview(e.target.value);
          }}
        />
        {selectedImage && (
          <Comment.SelectedImageContainer>
            <Comment.SelectedReviewImage>
              <img
                src={selectedImage ? URL.createObjectURL(selectedImage) : ''}
                alt="profile"
              />
              <button onClick={() => setSelectedImage(undefined)}>
                <span>×</span>
              </button>
            </Comment.SelectedReviewImage>
          </Comment.SelectedImageContainer>
        )}
      </Comment.Body>
      <Comment.SpaceBetweenFooter>
        <Comment.InputTypeFileLabel htmlFor="reviewImageFile">
          <img src={ImageIcon} alt="imageIcon" />
        </Comment.InputTypeFileLabel>
        <Comment.InputTypeFile
          type="file"
          id="reviewImageFile"
          onChange={(e) => handleSetReviewImage(e)}
          accept="image/*"
        />
        <Button.GreenSmall onClick={handleWriteReview}>
          작성 완료
        </Button.GreenSmall>
      </Comment.SpaceBetweenFooter>
    </BoxContainer>
  );
}

export default WriteReview;
