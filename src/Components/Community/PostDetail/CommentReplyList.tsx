import React, { useState } from 'react';
import styled from 'styled-components';
import CommunityPostReplyTextArea from './WriteCommentReply';
import { ReplyType } from '../../../Types/CommunityType';
import { Comment } from '../../../styles/Common/CommentStyle';
import ballIcon from '../../../styles/icon/soccerball.svg';

function CommentReplyList({ reply }: { reply: ReplyType[] }) {
  return (
    <Wrapper>
      {reply.map((comment) => (
        <ReplyLi>
          <ReplyIcon>∟</ReplyIcon>
          <div>
            <Comment.AuthorDiv>
              <Comment.ImgDiv>
                <img src={ballIcon} alt="BallIcon" />
              </Comment.ImgDiv>
              <div>
                <Comment.Author>{comment.nick_name}</Comment.Author>
                <Comment.PostDate>
                  {new Date(comment.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Comment.PostDate>
              </div>
            </Comment.AuthorDiv>
            <Comment.Contents>{comment.content}</Comment.Contents>
          </div>
        </ReplyLi>
      ))}
    </Wrapper>
  );
}

export default CommentReplyList;

const Wrapper = styled.div`
  padding-top: 1rem;
  @media (min-width: 1024px) {
    padding-top: 2.5rem;
  }
`;
const ReplyLi = styled.div`
  display: flex;
  background: #f8f8f6;
  padding: 2rem 0;
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
