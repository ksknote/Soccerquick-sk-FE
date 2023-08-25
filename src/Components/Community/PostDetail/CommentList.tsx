import React from 'react';
import styled from 'styled-components';
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
          <CommentReplyList
            reply={comment.reply}
            setUpdatePost={setUpdatePost}
          />
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
`;
