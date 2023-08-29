import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BoxContainer, Button } from '../../../styles/Common/CommonStyle';
import { Comment } from '../../../styles/Common/CommentStyle';
import ImageIcon from '../../../styles/icon/ImageIcon.svg';
import alertModal from '../../Commons/alertModal';
import uploadImage from '../../../Utils/uploadImage';
import { isLogInSelector } from '../../../redux/modules/Auth/authSelectors';
import { useNavigate } from 'react-router-dom';

interface WriteCommentPropsType {
  postId: string;
  setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>;
}

function WriteComment({ postId, setUpdatePost }: WriteCommentPropsType) {
  const navigate = useNavigate();
  const isLogin = useSelector(isLogInSelector);
  const [newComment, setNewComment] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File>();

  const checkLoginHandler = async (e?: React.MouseEvent) => {
    if (!isLogin) {
      e && e.preventDefault();
      const confirm = await alertModal(
        '로그인이 필요합니다. 로그인 하시겠습니까?',
        'submit'
      );
      if (confirm) navigate('/auth');
    }
  };
  const handleSetReviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return alertModal('이미지를 선택해주세요.', 'warning');

    setSelectedImage(file);
  };

  async function handleWriteReview() {
    if (!isLogin) return checkLoginHandler();

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
      })
      .catch((e) => {
        if (e.response.data.statusCode === 500) {
          alertModal('댓글 작성에 실패했습니다.', 'error');
        } else {
          alertModal(e.response.data.message, 'warning');
        }
        console.log(e);
      });
  }

  return (
    <BoxContainer>
      <Comment.Body>
        <Comment.TextArea
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          onClick={(e) => checkLoginHandler(e)}
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
          onClick={(e) => checkLoginHandler(e)}
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
