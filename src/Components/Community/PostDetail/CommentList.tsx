import React, { useState } from 'react';
import { CommentType } from '../../../Types/CommunityType';
import { BoxContainer } from '../../../styles/Common/CommonStyle';
import { Comment } from '../../../styles/Common/CommentStyle';
import ballIcon from '../../../styles/icon/soccerball.svg';
import CommentReplyList from './CommentReplyList';
import CommentItemContent from './CommentItemContent';

interface CommentList {
  comments: CommentType[];
  setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>;
}

function CommentList({ comments, setUpdatePost }: CommentList) {
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
          <CommentItemContent comment={comment} setUpdatePost={setUpdatePost} />
          <CommentReplyList reply={comment.reply}></CommentReplyList>
        </BoxContainer>
      ))}
    </div>
  );
}

export default CommentList;
