import React from 'react';
import { CommentType } from '../../../Types/CommunityType';
import { BoxContainer } from '../../../styles/Common/CommonStyle';
import { Comment } from '../../../styles/Common/CommentStyle';
import ballIcon from '../../../styles/icon/soccerball.svg';
import CommentReplyList from './CommentReplyList';
import WriteCommentReply from './WriteCommentReply';

function CommentList({ comments }: { comments: CommentType[] }) {
  return (
    <div>
      {comments.map((comment) => (
        <BoxContainer key={comment.comment_id}>
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
          <WriteCommentReply />
          <CommentReplyList reply={comment.comments}></CommentReplyList>
        </BoxContainer>
      ))}
    </div>
  );
}

export default CommentList;
