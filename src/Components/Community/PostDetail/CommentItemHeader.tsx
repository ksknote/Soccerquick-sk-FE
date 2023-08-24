import React from 'react';
import { Comment } from '../../../styles/Common/CommentStyle';
import { CommentType } from '../../../Types/CommunityType';
import ballIcon from '../../../styles/icon/soccerball.svg';

function CommentItemHeader({ comment }: { comment: CommentType }) {
  return (
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
  );
}

export default CommentItemHeader;
