import React from 'react';
import styled from 'styled-components';
import { ReplyType } from '../../../Types/CommunityType';
import { Comment } from '../../../styles/Common/CommentStyle';
import CommentItemHeader from './CommentItemHeader';
import CommentReplyContent from './CommentReplyContent';

interface ReplyListPropsType {
  reply: ReplyType[];
  setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>;
}

function CommentReplyList({ reply, setUpdatePost }: ReplyListPropsType) {
  return (
    <Wrapper show={reply.length !== 0}>
      {reply.map((comment) => (
        <ReplyLi>
          <ReplyIcon>∟</ReplyIcon>
          <ReplyContainer>
            <CommentItemHeader
              profile={comment.profile}
              nick_name={comment.nick_name}
              createdAt={comment.createdAt}
            />
            <CommentReplyContent
              comment={comment}
              setUpdatePost={setUpdatePost}
            />
          </ReplyContainer>
        </ReplyLi>
      ))}
    </Wrapper>
  );
}

export default CommentReplyList;

const Wrapper = styled.div<{ show: boolean }>`
  background: #f8f8f6;
  border-radius: 0 0 1.5rem 1.5rem;
`;
const ReplyLi = styled.div`
  display: flex;
  padding: 2rem 2rem;
  :not(:first-child) {
    border-top: 0.1rem solid #e6e6e6;
  }
`;

const ReplyIcon = styled.div`
  width: 3.5rem;
  font-size: 1.5rem;
  color: gray;
  text-align: center;
`;

const ReplyContainer = styled.div`
  width: 100%;
`;
