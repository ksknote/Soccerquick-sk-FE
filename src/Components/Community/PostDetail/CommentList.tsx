import React from 'react';
import styled from 'styled-components';
import { CommentwithRepliesType } from '../../../Types/CommunityType';
import { BoxContainer } from '../../../styles/Common/CommonStyle';
import CommentReplyList from './CommentReplyList';
import CommentItemHeader from './CommentItemHeader';
import CommentItemContent from './CommentItemContent';

interface CommentList {
  comments: CommentwithRepliesType[];
  setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>;
}

function CommentList({ comments, setUpdatePost }: CommentList) {
  return (
    <div>
      {comments.map(({ comment, replies }) => (
        <CommentBoxContainer key={comment.comment_id}>
          <CommentItem>
            <CommentItemHeader
              profile={comment.profile}
              nick_name={comment.nick_name}
              createdAt={comment.createdAt}
            />
            <CommentItemContent
              comment={comment}
              setUpdatePost={setUpdatePost}
            />
          </CommentItem>
          <CommentReplyList replies={replies} setUpdatePost={setUpdatePost} />
        </CommentBoxContainer>
      ))}
    </div>
  );
}

export default CommentList;

const CommentBoxContainer = styled(BoxContainer)`
  padding: 0;
`;

const CommentItem = styled.div`
  padding: 2rem;
  @media (min-width: 1024px) {
    padding: 2.5rem;
  }
`;
