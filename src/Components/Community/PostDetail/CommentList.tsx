import React from 'react';
import { CommentType } from '../../../Types/CommunityType';
import {
  CommentLiContainer,
  StyledImgDiv,
  StyledContents,
} from '../../../Pages/TeamPage/Styles/ComponentStyle';
import {
  CommentAuthorDiv,
  CommentAuthor,
  PostDate,
} from '../../../styles/Common/CommentStyle';
import ballIcon from '../../../styles/icon/soccerball.svg';
import CommentReplyList from './CommentReplyList';
import WriteCommentReply from './WriteCommentReply';

function CommentList({ comments }: { comments: CommentType[] }) {
  return (
    <div>
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
          <WriteCommentReply />
          <CommentReplyList reply={comment.comments}></CommentReplyList>
        </CommentLiContainer>
      ))}
    </div>
  );
}

export default CommentList;
