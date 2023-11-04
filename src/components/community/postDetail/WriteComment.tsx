import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchCommunityPost } from '../../../redux/modules/community/actions';
import { isLoginSelector } from '../../../redux/modules/auth/selector';
import {
  BoxContainer,
  Button,
} from '../../../styles/styled-components/CommonStyle';
import { Comment } from '../../../styles/styled-components/CommentStyle';
import ImageIcon from '../../../assets/icon/ImageIcon.svg';
import alertModal from '../../common/alertModal';
import uploadImage from '../../../utils/uploadImage';

function WriteComment() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLogin = useSelector(isLoginSelector);
  const post_id = useSelector(
    (state: RootState) => state.communityPost.post_id
  );
  const [newComment, setNewComment] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File>();

  const updatePost = () => {
    dispatch(fetchCommunityPost(post_id));
  };

  const checkLoginHandler = async (e?: React.MouseEvent) => {
    if (!isLogin) {
      e && e.preventDefault();
      const confirm = await alertModal('로그인 하시겠습니까?', 'submit');
      if (confirm) navigate('/auth');
    }
  };
  const setReviewImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return alertModal('이미지를 선택해주세요.', 'warning');

    setSelectedImage(file);
  };

  async function writeReviewHanlder() {
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
        `${process.env.REACT_APP_API_URL}/communities/${post_id}/comment`,
        data,
        config
      )
      .then((res) => {
        setNewComment('');
        setSelectedImage(undefined);
        updatePost();
        alertModal('댓글이 작성되었습니다.', 'success');
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
          onChange={(e) => setReviewImageHandler(e)}
          accept="image/*"
        />
        <Button.GreenSmall onClick={writeReviewHanlder}>
          작성 완료
        </Button.GreenSmall>
      </Comment.SpaceBetweenFooter>
    </BoxContainer>
  );

  return null;
}

export default WriteComment;
