import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BoxContainer, Button } from '../../../styles/Common/CommonStyle';
import { Comment } from '../../../styles/Common/CommentStyle';
import ImageIcon from '../../../styles/icon/ImageIcon.svg';
import alertModal from '../../Commons/alertModal';
import uploadImage from '../../../Utils/uploadImage';
import {
  userSelector,
  isLogInSelector,
} from '../../../ReduxStore/modules/Auth/authSelectors';

interface WriteCommentPropsType {
  postId: string;
  setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>;
}

function WriteComment({ postId, setUpdatePost }: WriteCommentPropsType) {
  const isLogin = useSelector(isLogInSelector);
  const userData = useSelector(userSelector);
  const [newComment, setNewComment] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File>();

  const handleSetReviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return alertModal('이미지를 선택해주세요.', 'warning');

    setSelectedImage(file);
  };

  async function handleWriteReview() {
    if (!isLogin) return alertModal('로그인이 필요한 서비스입니다.', 'warning');

    if (newComment === '') return alertModal('내용을 입력해주세요!', 'warning');

    const image = await uploadImage(selectedImage);
    const config = { withCredentials: true };
    const data = {
      content: newComment,
      image,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/communities/${postId}/comment`,
        data,
        config
      )
      .then((res) => {
        setNewComment('');
        setSelectedImage(undefined);
        setUpdatePost(true);
      });
  }
  if (isLogin)
    return (
      <BoxContainer>
        <Comment.Body>
          <Comment.TextArea
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
          {selectedImage && (
            <Comment.SelectedImageContainer>
              <Comment.SelectedImage>
                <img
                  src={selectedImage ? URL.createObjectURL(selectedImage) : ''}
                  alt="profile"
                />
                <button onClick={() => setSelectedImage(undefined)}>
                  <span>×</span>
                </button>
              </Comment.SelectedImage>
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

  return null;
}

export default WriteComment;
