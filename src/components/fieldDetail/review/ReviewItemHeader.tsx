import React from 'react';
import styled from 'styled-components';
import { ReviewDataType } from '../../../types/ReviewType';
import LikeButton from '../../common/LikeButton';
import { Comment } from '../../../styles/styled-components/CommentStyle';
function ReviewItemHeader({ reviewItem }: { reviewItem: ReviewDataType }) {
  const { user_icon, user_name, createdAt, likedreviews, review_id } =
    reviewItem;

  return (
    <Comment.AuthorDiv>
      <Comment.UserInfo>
        <Comment.ImgDiv>
          <img src={user_icon} alt="avatar" />
        </Comment.ImgDiv>
        <div>
          <Comment.Author>{user_name}</Comment.Author>
          <Comment.PostDate>
            {createdAt &&
              new Date(createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
          </Comment.PostDate>
        </div>
      </Comment.UserInfo>
      <span className="likes">
        <LikeButton likedreviews={likedreviews} reviewId={review_id} />
      </span>
    </Comment.AuthorDiv>
  );
}

export default ReviewItemHeader;
