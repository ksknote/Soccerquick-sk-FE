import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../../styles/Common/CommonStyle';
import { Comment } from '../../../styles/Common/CommentStyle';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../ReduxStore/modules/Auth/authSelectors';
import { CommentType } from '../../../Types/CommunityType';

function WriteCommentReply({ comment }: { comment: CommentType }) {
  const userData = useSelector(userSelector);
  const [isTextAreaOpen, setIsTextAreaOpen] = useState(false);

  if (isTextAreaOpen) {
    return (
      <Wrapper>
        <TextArea wrap="hard" placeholder="댓글을 작성하세요." />
        <Comment.ButtonsFooter>
          <Button.WhiteSmall onClick={() => setIsTextAreaOpen(false)}>
            취소
          </Button.WhiteSmall>
          <Button.GreenSmall>댓글 작성</Button.GreenSmall>
        </Comment.ButtonsFooter>
      </Wrapper>
    );
  }

  if (userData?.user_id === comment.userId) {
    return (
      <Comment.SpaceBetweenFooter>
        <ReplyButton onClick={() => setIsTextAreaOpen((prev) => !prev)}>
          답글 달기
        </ReplyButton>
        <div>
          <Button.WhiteSmall>삭제</Button.WhiteSmall>
          <Button.GreenSmall>수정</Button.GreenSmall>
        </div>
      </Comment.SpaceBetweenFooter>
    );
  }

  return (
    <ReplyButton onClick={() => setIsTextAreaOpen((prev) => !prev)}>
      답글 달기
    </ReplyButton>
  );
}

export default WriteCommentReply;

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
