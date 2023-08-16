import React from 'react';
import { CommentType } from '../../Types/CommunityType';
import commentIcon from '../../styles/icon/comment.svg';
import ballIcon from '../../styles/icon/soccerball.svg';
import {
  StyledCommentContainer,
  StyledCommentTitle,
  CommentLiContainer,
  StyledAuthorDiv,
  StyledImgDiv,
  StyledDetailDiv,
  StyledGender,
  StyledPosition,
  StyledLevel,
  StyledContents,
  StyledCommentButtons,
} from '../../Pages/TeamPage/Styles/ComponentStyle';

function CommunityPostComment({ comments }: { comments: CommentType[] }) {
  return (
    <StyledCommentContainer>
      <div>
        <StyledCommentTitle>
          <img src={commentIcon} alt="" />
          신청 목록
        </StyledCommentTitle>

        {comments.map((comment) => (
          <CommentLiContainer key={comment.comment_id}>
            <StyledAuthorDiv>
              <StyledImgDiv>
                <img src={ballIcon} alt="BallIcon" />
              </StyledImgDiv>
              <p>{comment.user_id}</p>
            </StyledAuthorDiv>
            <StyledContents>{comment.content}</StyledContents>
          </CommentLiContainer>
        ))}
      </div>
    </StyledCommentContainer>
  );
}

export default CommunityPostComment;
