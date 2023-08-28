import React from 'react';
import styled from 'styled-components';
import { ReplyType } from '../../../Types/CommunityType';
import { Comment } from '../../../styles/Common/CommentStyle';
import CommentItemHeader from './CommentItemHeader';
import CommentReplyContent from './CommentReplyContent';

interface ReplyListPropsType {
  replies: ReplyType[];
  setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>;
}

function CommentReplyList({ replies, setUpdatePost }: ReplyListPropsType) {
  return (
    <Wrapper>
      {replies.map((reply) => (
        <ReplyLi key={reply.reply_id}>
          <ReplyIcon>∟</ReplyIcon>
          <ReplyContainer>
            <CommentItemHeader
              profile={reply.profile}
              nick_name={reply.nick_name}
              createdAt={reply.createdAt}
            />
            <CommentReplyContent
              comment={reply}
              setUpdatePost={setUpdatePost}
            />
          </ReplyContainer>
        </ReplyLi>
      ))}
    </Wrapper>
  );
}

export default CommentReplyList;

const Wrapper = styled.div`
  background: #f8f8f6;
  border-radius: 0 0 1.5rem 1.5rem;
`;
const ReplyLi = styled.div`
  display: flex;
  padding: 2rem;
  :not(:first-child) {
    border-top: 0.1rem solid #e6e6e6;
  }
  @media (min-width: 1024px) {
    padding: 2.5rem;
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
