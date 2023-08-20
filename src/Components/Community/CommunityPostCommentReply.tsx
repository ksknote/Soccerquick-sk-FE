import React, { useState } from 'react';
import styled from 'styled-components';
import CommunityPostReplyTextArea from './CommunityPostReplyTextArea';
import { ReplyType } from '../../Types/CommunityType';
import {
  StyledImgDiv,
  StyledContents,
} from '../../Pages/TeamPage/Styles/ComponentStyle';
import {
  CommentAuthor,
  CommentAuthorDiv,
  PostDate,
} from './CommunityPostComment';
import ballIcon from '../../styles/icon/soccerball.svg';

function CommunityPostCommentReply({ reply }: { reply: ReplyType[] }) {
  if (reply.length === 0) {
    return <CommunityPostReplyTextArea></CommunityPostReplyTextArea>;
  }

  return (
    <>
      <CommunityPostReplyTextArea></CommunityPostReplyTextArea>
      <Wrapper>
        {reply.map((comment) => (
          <ReplyLi>
            <ReplyIcon>∟</ReplyIcon>
            <div>
              <CommentAuthorDiv>
                <StyledImgDiv>
                  <img src={ballIcon} alt="BallIcon" />
                </StyledImgDiv>
                <div>
                  <CommentAuthor>{comment.nick_name}</CommentAuthor>
                  <PostDate>
                    {new Date(comment.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </PostDate>
                </div>
              </CommentAuthorDiv>
              <StyledContents>{comment.content}</StyledContents>
            </div>
          </ReplyLi>
        ))}
      </Wrapper>
    </>
  );
}

export default CommunityPostCommentReply;

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
