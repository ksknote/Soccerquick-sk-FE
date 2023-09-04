import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchCommunityPost } from '../../../redux/modules/community/actions';
import { CommentwithRepliesType } from '../../../types/CommunityType';
import { BoxContainer } from '../../../styles/Common/CommonStyle';
import CommentReplyList from './CommentReplyList';
import CommentItemHeader from './CommentItemHeader';
import CommentItemContent from './CommentItemContent';

function CommentList() {
  const comments = useSelector(
    (state: RootState) => state.communityPost.postData?.comments
  );
  return (
    <div>
      {comments &&
        comments.map(({ comment, replies }) => (
          <CommentBoxContainer key={comment.comment_id}>
            <CommentItem>
              <CommentItemHeader
                profile={comment.profile}
                nick_name={comment.nick_name}
                createdAt={comment.createdAt}
              />
              <CommentItemContent comment={comment} />
            </CommentItem>
            <CommentReplyList replies={replies} />
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
