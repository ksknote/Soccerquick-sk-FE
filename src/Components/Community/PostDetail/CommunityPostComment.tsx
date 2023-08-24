import React from 'react';
import { CommentType } from '../../../Types/CommunityType';
import commentIcon from '../../../styles/icon/comment.svg';
import { Comment } from '../../../styles/Common/CommentStyle';
import CommentList from './CommentList';
import WriteComment from './WriteComment';
import { PostWithCommentsType } from '../../../Types/CommunityType';

interface CommentPropsType {
  postId: string;
  comments: CommentType[];
  setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>;
}

function CommunityPostComment({
  comments,
  postId,
  setUpdatePost,
}: CommentPropsType) {
  return (
    <Comment.Container>
      <div>
        <Comment.Title>
          <img src={commentIcon} alt="" />
          댓글 {comments.length}개
        </Comment.Title>
        <WriteComment postId={postId} setUpdatePost={setUpdatePost} />
        <CommentList comments={comments} />
      </div>
    </Comment.Container>
  );
}

export default CommunityPostComment;
