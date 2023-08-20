import React from 'react';
import { CommentType } from '../../Types/CommunityType';
import commentIcon from '../../styles/icon/comment.svg';
import ballIcon from '../../styles/icon/soccerball.svg';
import {
  StyledCommentContainer,
  StyledCommentTitle,
  CommentLiContainer,
  StyledImgDiv,
  StyledContents,
} from '../../Pages/TeamPage/Styles/ComponentStyle';
import styled from 'styled-components';
import CommunityPostCommentReply from './CommunityPostCommentReply';

function CommunityPostComment({ comments }: { comments: CommentType[] }) {
  return (
    <StyledCommentContainer>
      <div>
        <StyledCommentTitle>
          <img src={commentIcon} alt="" />
          댓글 {comments.length}개
        </StyledCommentTitle>

        {comments.map((comment) => (
          <CommentLiContainer key={comment.comment_id}>
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
            <CommunityPostCommentReply
              reply={comment.comments}
            ></CommunityPostCommentReply>
          </CommentLiContainer>
        ))}
      </div>
    </StyledCommentContainer>
  );
}

export default CommunityPostComment;

export const CommentAuthorDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

export const CommentAuthor = styled.p`
  font-size: 1.3rem;
  @media (min-width: 1024px) {
    font-size: 1.8rem;
  }
`;
export const PostDate = styled.div`
  color: gray;
  font-size: 1.1rem;
  @media (min-width: 1024px) {
    font-size: 1.4rem;
  }
`;
