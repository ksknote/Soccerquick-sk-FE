import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { isLogInSelector } from '../../../ReduxStore/modules/Auth/authSelectors';
import { ReviewDataType } from '../../../Types/ReviewType';
import LikeButton from '../../Commons/LikeButton';
import { Comment } from '../../../styles/Common/CommentStyle';
function ReviewItemHeader({ reviewItem }: { reviewItem: ReviewDataType }) {
  const isLogin = useSelector(isLogInSelector);
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
        <LikeButton
          likedreviews={likedreviews}
          reviewId={review_id}
          isLogin={isLogin}
        />
      </span>
    </Comment.AuthorDiv>
  );
}

export default ReviewItemHeader;

const ReviewHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
  img {
    width: 4rem;
    height: 4rem;
    margin-right: 1rem;
    border-radius: 5rem;
    object-fit: cover;
    @media (min-width: 1024px) {
      width: 5rem;
      height: 5rem;
    }
  }
`;

const UserDetail = styled.div`
  p {
    font-size: 1.3rem;
    font-weight: 500;
    :last-child {
      font-size: 1.1rem;
      font-weight: 400;
    }
  }
  @media (min-width: 1024px) {
    p {
      font-size: 1.7rem;
      :last-child {
        font-size: 1.3rem;
      }
    }
  }
`;
