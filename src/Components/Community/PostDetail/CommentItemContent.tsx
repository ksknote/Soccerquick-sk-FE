import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../../styles/Common/CommonStyle';
import { Comment } from '../../../styles/Common/CommentStyle';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../ReduxStore/modules/Auth/authSelectors';
import { CommentType } from '../../../Types/CommunityType';
import alertModal from '../../Commons/alertModal';
import axios from 'axios';

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
  const url = `${process.env.REACT_APP_API_URL}/communities/${comment.post_id}/comment/${comment.comment_id}`;
  const config = { withCredentials: true };

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

  //대댓글 작성 활성화 된 경우
  if (isTextAreaOpen) {
    return (
      <Comment.Body>
        <Comment.Contents>{comment.content}</Comment.Contents>
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

  const undoEditHandler = () => {
    setIsCommentEditable(false);
    setEditComment('');
  };

  const editCommentHandler = () => {
    if (editComment.length === 0) {
      return alertModal('내용을 입력해주세요.', 'warning');
    }
    const data = { content: editComment };
    axios
      .patch(url, data, config)
      .then((res) => {
        alertModal('댓글 수정 완료', 'success');
        setUpdatePost(true);
        setIsCommentEditable(false);
        setEditComment('');
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
        <Comment.ButtonsFooter>
          <div>
            <Button.WhiteSmall onClick={undoEditHandler}>
              취소
            </Button.WhiteSmall>
            <Button.GreenSmall onClick={editCommentHandler}>
              완료
            </Button.GreenSmall>
          </div>
        </Comment.ButtonsFooter>
      </Comment.Body>
    );
  }

  //작성자인 경우
  if (userData?.user_id === comment.userId) {
    return (
      <Comment.Body>
        <Comment.Contents>{comment.content}</Comment.Contents>
        <Comment.SpaceBetweenFooter>
          <ReplyButton onClick={() => setIsTextAreaOpen((prev) => !prev)}>
            답글 달기
          </ReplyButton>
          <div>
            <Button.WhiteSmall onClick={deleteCommentHandler}>
              삭제
            </Button.WhiteSmall>
            <Button.GreenSmall onClick={() => setIsCommentEditable(true)}>
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
