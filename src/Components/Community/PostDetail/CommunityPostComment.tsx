import React from 'react';
import { CommentType } from '../../../Types/CommunityType';
import commentIcon from '../../../styles/icon/comment.svg';
import {
  StyledCommentContainer,
  StyledCommentTitle,
} from '../../../Pages/TeamPage/Styles/ComponentStyle';
import styled from 'styled-components';
import CommentList from './CommentList';
import WriteComment from './WriteComment';

function CommunityPostComment({ comments }: { comments: CommentType[] }) {
  return (
    <StyledCommentContainer>
      <div>
        <StyledCommentTitle>
          <img src={commentIcon} alt="" />
          댓글 {comments.length}개
        </StyledCommentTitle>
        <WriteComment />
        <CommentList comments={comments} />
      </div>
    </StyledCommentContainer>
  );
}

export default CommunityPostComment;
