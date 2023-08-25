import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../ReduxStore/modules/Auth/authSelectors';
import { Button } from '../../../styles/Common/CommonStyle';
import { Comment } from '../../../styles/Common/CommentStyle';
import { CommentType } from '../../../Types/CommunityType';
import alertModal from '../../Commons/alertModal';
import ImageIcon from '../../../styles/icon/ImageIcon.svg';
import uploadImage from '../../../Utils/uploadImage';

interface CommentFooterPropsType {
  comment: CommentType;
  setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>;
}

function CommentItemContent({
  comment,
  setUpdatePost,
}: CommentFooterPropsType) {
  const userData = useSelector(userSelector);
  const [isTextAreaOpen, setIsTextAreaOpen] = useState(false);
  const [isCommentEditable, setIsCommentEditable] = useState(false);
  const [editComment, setEditComment] = useState('');
  const [selectedEditImage, setSelectedEditImage] = useState<File>();
  const [isImageChanged, setIsImageChanged] = useState(false);
  const url = `${process.env.REACT_APP_API_URL}/communities/${comment.post_id}/comment/${comment.comment_id}`;
  const config = { withCredentials: true };

  if (isTextAreaOpen) {
    return (
      <Comment.Body>
        <Comment.Contents>{comment.content}</Comment.Contents>
        {comment.image && (
          <Comment.Image>
            <img src={comment.image} />
          </Comment.Image>
        )}
        <Wrapper>
          <TextArea wrap="hard" placeholder="댓글을 작성하세요." />
          <Comment.ButtonsFooter>
            <Button.WhiteSmall onClick={() => setIsTextAreaOpen(false)}>
              취소
            </Button.WhiteSmall>
            <Button.GreenSmall>댓글 작성</Button.GreenSmall>
          </Comment.ButtonsFooter>
        </Wrapper>
      </Comment.Body>
    );
  }

  //댓글 수정 활성화된 경우

  const undoEditHandler = () => {
    setIsCommentEditable(false);
    setEditComment('');
  };

  const setCommentImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      alertModal('이미지를 선택해주세요.', 'warning');
      return;
    }
    setSelectedEditImage(file);
    setIsImageChanged(true);
  };

  const editCommentHandler = async () => {
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
        setUpdatePost(true);
        setIsCommentEditable(false);
        setEditComment('');
        setSelectedEditImage(undefined);
      })
      .catch((e) => {
        alertModal('수정에 실패하였습니다.', ' warning');
        console.log(e);
      });
  };

  if (isCommentEditable) {
    return (
      <Comment.Body>
        <Comment.TextArea
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
            onChange={(e) => setCommentImageHandler(e)}
            accept="image/*"
          />
          <div>
            <Button.WhiteSmall onClick={undoEditHandler}>
              취소
            </Button.WhiteSmall>
            <Button.GreenSmall onClick={editCommentHandler}>
              완료
            </Button.GreenSmall>
          </div>
        </Comment.SpaceBetweenFooter>
      </Comment.Body>
    );
  }

  //작성자인 경우
  const deleteCommentHandler = async () => {
    const confirmed = await alertModal('삭제하시겠습니까?', 'submit');
    if (confirmed) {
      axios
        .delete(url, config)
        .then((res) => {
          alertModal('삭제되었습니다.', 'success');
          setUpdatePost(true);
        })
        .catch((e) => console.log(e));
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

  if (userData?.user_id === comment.userId) {
    return (
      <Comment.Body>
        <Comment.Contents>{comment.content}</Comment.Contents>
        {comment.image && (
          <Comment.Image>
            <img src={comment.image} />
          </Comment.Image>
        )}{' '}
        <Comment.SpaceBetweenFooter>
          <ReplyButton onClick={() => setIsTextAreaOpen((prev) => !prev)}>
            답글 달기
          </ReplyButton>
          <div>
            <Button.WhiteSmall onClick={deleteCommentHandler}>
              삭제
            </Button.WhiteSmall>
            <Button.GreenSmall onClick={setEditableHandler}>
              수정
            </Button.GreenSmall>
          </div>
        </Comment.SpaceBetweenFooter>
      </Comment.Body>
    );
  }

  //작성자X 대댓글 활성화X
  return (
    <Comment.Body>
      <Comment.Contents>{comment.content}</Comment.Contents>
      {comment.image && (
        <Comment.Image>
          <img src={comment.image} />
        </Comment.Image>
      )}
      <ReplyButton onClick={() => setIsTextAreaOpen((prev) => !prev)}>
        답글 달기
      </ReplyButton>
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

const TextArea = styled.textarea`
  width: 100%;
  height: 7rem;
  border: none;
  resize: none; /* 크기 조정 비활성화 */
  box-sizing: border-box;
  border: 0.1rem solid #e6e6e6;
  margin-bottom: 1rem;
  padding: 1rem;
  :focus {
    outline: none;
  }
  @media (min-width: 1024px) {
    height: 10rem;
    font-size: 1.8rem;
  }
`;

const ReplyButton = styled.button`
  background: transparent;
  color: gray;
  padding: 0;
  @media (min-width: 1024px) {
    font-size: 1.7rem;
  }
`;
