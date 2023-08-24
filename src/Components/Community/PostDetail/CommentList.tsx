import React from 'react';
import { CommentType } from '../../../Types/CommunityType';
import { BoxContainer } from '../../../styles/Common/CommonStyle';
import { Comment } from '../../../styles/Common/CommentStyle';
import ballIcon from '../../../styles/icon/soccerball.svg';
import CommentReplyList from './CommentReplyList';
import CommentFooter from './CommentFooter';

function CommentList({ comments }: { comments: CommentType[] }) {
  return (
    <div>
      {comments.map((comment) => (
        <BoxContainer key={comment.comment_id}>
          <Comment.AuthorDiv>
            <Comment.UserInfo>
              <Comment.ImgDiv>
                <img
                  src={comment.profile ? comment.profile : ballIcon}
                  alt="BallIcon"
                />
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
            </Comment.UserInfo>
          </Comment.AuthorDiv>
          <Comment.Contents>{comment.content}</Comment.Contents>
          <CommentFooter comment={comment} />
          <CommentReplyList reply={comment.reply}></CommentReplyList>
        </BoxContainer>
      ))}
    </div>
  );
}

export default CommentList;
