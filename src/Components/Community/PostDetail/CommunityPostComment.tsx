import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import commentIcon from '../../../styles/icon/comment.svg';
import { Comment } from '../../../styles/Common/CommentStyle';
import CommentList from './CommentList';
import WriteComment from './WriteComment';

function CommunityPostComment() {
  const comments = useSelector(
    (state: RootState) => state.communityPost.postData?.comments
  );
  return (
    <Comment.Container>
      <Comment.Title>
        <img src={commentIcon} alt="" />
        댓글 {comments ? comments.length : 0}개
      </Comment.Title>
      <WriteComment />
      <CommentList />
    </Comment.Container>
  );
}

export default CommunityPostComment;
