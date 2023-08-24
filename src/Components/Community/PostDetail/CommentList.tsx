import React from 'react';
import { CommentType } from '../../../Types/CommunityType';
import { BoxContainer } from '../../../styles/Common/CommonStyle';
import CommentReplyList from './CommentReplyList';
import CommentItemHeader from './CommentItemHeader';
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
          <CommentItemHeader comment={comment} />
          <CommentItemContent comment={comment} setUpdatePost={setUpdatePost} />
          <CommentReplyList reply={comment.reply}></CommentReplyList>
        </BoxContainer>
      ))}
    </div>
  );
}

export default CommentList;
