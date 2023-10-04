import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  userSelector,
  isLoginSelector,
} from '../../../redux/modules/auth/selector';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchCommunityPost } from '../../../redux/modules/community/actions';
import { Button } from '../../../styles/styled-components/CommonStyle';
import { Comment } from '../../../styles/styled-components/CommentStyle';
import { CommentType } from '../../../types/CommunityType';
import alertModal from '../../common/alertModal';
import ImageIcon from '../../../assets/icon/ImageIcon.svg';
import uploadImage from '../../../utils/uploadImage';
import { useNavigate } from 'react-router-dom';

interface CommentContentPropsType {
  comment: CommentType;
}

function CommentItemContent({ comment }: CommentContentPropsType) {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector(userSelector);
  const isLogin = useSelector(isLoginSelector);
  const post_id = useSelector(
    (state: RootState) => state.communityPost.post_id
  );
  const navigate = useNavigate();
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [selectedReplyImage, setSelectedReplyImage] = useState<File>();
  const [isCommentEditable, setIsCommentEditable] = useState(false);
  const [editComment, setEditComment] = useState('');
  const [selectedEditImage, setSelectedEditImage] = useState<File>();
  const [isImageChanged, setIsImageChanged] = useState(false);
  const url = `${process.env.REACT_APP_API_URL}/communities/${comment.post_id}/comment/${comment.comment_id}`;
  const config = { withCredentials: true };

  const updatePost = () => {
    dispatch(fetchCommunityPost(post_id));
  };

  const setImageHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) {
      alertModal('이미지를 선택해주세요.', 'warning');
      return;
    }
    if (type === 'reply') {
      setSelectedReplyImage(file);
      setIsImageChanged(true);
    } else if (type === 'edit') {
      setSelectedEditImage(file);
      setIsImageChanged(true);
    }
  };

  const openReplyHandler = async () => {
    if (!isLogin) {
      const confirm = await alertModal('로그인 하시겠습니까?', 'submit');
      if (confirm) navigate('/auth');
    } else {
      setIsReplyOpen(true);
    }
  };

  const undoReplyHandler = () => {
    setIsReplyOpen(false);
    setReplyContent('');
  };

  const submitReplyHandler = async () => {
    if (replyContent.length === 0) {
      return alertModal('내용을 입력해주세요.', 'warning');
    }

    let image: string | undefined;
    if (selectedReplyImage && isImageChanged) {
      image = await uploadImage(selectedReplyImage);
    }
    const data = { content: replyContent, image };
    axios
      .post(`${url}/reply`, data, config)
      .then((res) => {
        updatePost();
        setIsReplyOpen(false);
        setReplyContent('');
        setSelectedReplyImage(undefined);
        setIsImageChanged(false);
      })
      .catch((e) => {
        if (e.response.data.statusCode === 500) {
          alertModal('댓글 작성에 실패했습니다.', 'error');
        } else {
          alertModal(e.response.data.message, 'warning');
        }
        console.log(e);
      });
  };

  //대댓글 활성화된 경우

  if (isReplyOpen) {
    return (
      <Comment.Body>
        <Comment.ContentsWrapper>
          <Comment.Contents>{comment.content}</Comment.Contents>
          {comment.image && (
            <Comment.Image>
              <img src={comment.image} />
            </Comment.Image>
          )}
        </Comment.ContentsWrapper>
        <Wrapper>
          <ReplyTextArea>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="댓글을 작성하세요."
            />
            {selectedReplyImage && (
              <Comment.SelectedImageContainer>
                <Comment.SelectedImage>
                  <img
                    src={
                      selectedReplyImage
                        ? URL.createObjectURL(selectedReplyImage)
                        : ''
                    }
                    alt="profile"
                  />
                  <button onClick={() => setSelectedReplyImage(undefined)}>
                    <span>×</span>
                  </button>
                </Comment.SelectedImage>
              </Comment.SelectedImageContainer>
            )}
          </ReplyTextArea>
          <Comment.SpaceBetweenFooter>
            <Comment.InputTypeFileLabel htmlFor="replyImageFile">
              <img src={ImageIcon} alt="imageIcon" />
            </Comment.InputTypeFileLabel>
            <Comment.InputTypeFile
              type="file"
              id="replyImageFile"
              onChange={(e) => setImageHandler(e, 'reply')}
              accept="image/*"
            />
            <div>
              <Button.WhiteSmall onClick={undoReplyHandler}>
                취소
              </Button.WhiteSmall>
              <Button.GreenSmall onClick={submitReplyHandler}>
                댓글 작성
              </Button.GreenSmall>
            </div>
          </Comment.SpaceBetweenFooter>
        </Wrapper>
      </Comment.Body>
    );
  }

  const undoEditHandler = () => {
    setIsCommentEditable(false);
    setEditComment('');
  };

  const submitEditCommentHandler = async () => {
    if (editComment.length === 0) {
      return alertModal('내용을 입력해주세요.', 'warning');
    }
    let image: string | undefined;
    if (selectedEditImage && isImageChanged) {
      image = await uploadImage(selectedEditImage);
    }
    const data = { content: editComment, image };
    axios
      .patch(url, data, config)
      .then((res) => {
        alertModal('댓글 수정 완료', 'success');
        updatePost();
        setIsCommentEditable(false);
        setEditComment('');
        setSelectedEditImage(undefined);
        setIsImageChanged(false);
      })
      .catch((e) => {
        if (e.response.data.statusCode === 500) {
          alertModal('댓글 수정에 실패했습니다.', 'error');
        } else {
          alertModal(e.response.data.message, 'warning');
        }
        console.log(e);
      });
  };

  //댓글 수정 활성화된 경우

  if (isCommentEditable) {
    return (
      <Comment.Body>
        <EditTextArea
          placeholder="수정 내용을 입력하세요."
          value={editComment}
          onChange={(e) => setEditComment(e.target.value)}
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
        <Comment.SpaceBetweenFooter>
          <Comment.InputTypeFileLabel htmlFor="EditImageFile">
            <img src={ImageIcon} alt="imageIcon" />
          </Comment.InputTypeFileLabel>
          <Comment.InputTypeFile
            type="file"
            id="EditImageFile"
            onChange={(e) => setImageHandler(e, 'edit')}
            accept="image/*"
          />
          <div>
            <Button.WhiteSmall onClick={undoEditHandler}>
              취소
            </Button.WhiteSmall>
            <Button.GreenSmall onClick={submitEditCommentHandler}>
              완료
            </Button.GreenSmall>
          </div>
        </Comment.SpaceBetweenFooter>
      </Comment.Body>
    );
  }

  const deleteCommentHandler = async () => {
    const confirmed = await alertModal('삭제하시겠습니까?', 'submit');
    if (confirmed) {
      axios
        .delete(url, config)
        .then((res) => {
          alertModal('삭제되었습니다.', 'success');
          updatePost();
        })
        .catch((e) => {
          if (e.response.data.statusCode === 500) {
            alertModal('댓글 삭제에 실패했습니다.', 'error');
          } else {
            alertModal(e.response.data.message, 'warning');
          }
          console.log(e);
        });
    }
  };

  async function setEditableHandler() {
    if (comment.image) {
      const image = await fetch(comment.image); // 이미지 데이터 가져오기
      const blob = await image.blob();
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
      setSelectedEditImage(file);
    }
    setEditComment(comment.content || '');
    setIsCommentEditable(true);
  }

  //작성자인 경우

  if (userData?.user_id === comment.userId) {
    return (
      <Comment.Body>
        <Comment.ContentsWrapper>
          <Comment.Contents>{comment.content}</Comment.Contents>
          {comment.image && (
            <Comment.Image>
              <img src={comment.image} />
            </Comment.Image>
          )}
        </Comment.ContentsWrapper>
        <Comment.SpaceBetweenFooter>
          <Comment.TextButton onClick={openReplyHandler}>
            답글 달기
          </Comment.TextButton>
          <div>
            <Comment.TextButton onClick={deleteCommentHandler}>
              삭제
            </Comment.TextButton>
            <Comment.TextButton onClick={setEditableHandler}>
              수정
            </Comment.TextButton>
          </div>
        </Comment.SpaceBetweenFooter>
      </Comment.Body>
    );
  }

  //작성자X 대댓글 활성화X
  return (
    <Comment.Body>
      <Comment.ContentsWrapper>
        <Comment.Contents>{comment.content}</Comment.Contents>
        {comment.image && (
          <Comment.Image>
            <img src={comment.image} />
          </Comment.Image>
        )}
      </Comment.ContentsWrapper>

      <div>
        <Comment.TextButton onClick={openReplyHandler}>
          답글 달기
        </Comment.TextButton>
      </div>
    </Comment.Body>
  );
}

export default CommentItemContent;

const Wrapper = styled.div`
  border-top: 0.1rem solid #e6e6e6;
  padding: 1rem 0;
  @media (min-width: 1024px) {
    padding: 2rem 0;
  }
`;

const ReplyTextArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 8rem;
  box-sizing: border-box;
  border: 0.1rem solid #e6e6e6;
  margin-bottom: 1rem;
  padding: 1rem;
  textarea {
    border: none;
    resize: none; /* 크기 조정 비활성화 */
    :focus {
      outline: none;
    }
  }
  @media (min-width: 1024px) {
    min-height: 10rem;
    textarea {
      font-size: 1.6rem;
    }
  }
`;

const EditTextArea = styled(Comment.TextArea)`
  margin: 2.5rem 0;
`;
