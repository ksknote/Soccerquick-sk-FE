import React from 'react';
import { CommentType } from '../../../Types/CommunityType';
import commentIcon from '../../../styles/icon/comment.svg';
import { Comment } from '../../../styles/Common/CommentStyle';
import CommentList from './CommentList';
import WriteComment from './WriteComment';

function CommunityPostComment({ comments }: { comments: CommentType[] }) {
  return (
    <Comment.Container>
      <div>
        <Comment.Title>
          <img src={commentIcon} alt="" />
          댓글 {comments.length}개
        </Comment.Title>
        <WriteComment />
        <CommentList comments={comments} />
      </div>
    </Comment.Container>
  );
}

export default CommunityPostComment;
