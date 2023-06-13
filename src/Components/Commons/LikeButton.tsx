import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';

interface LikeButtonProps {
  likedreviews: string[];
  reviewId?: string;
}

const config = {
  withCredentials: true,
};

export default function LikeButton(props: LikeButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [likesCount, setLikesCount] = useState(
    props.likedreviews ? props.likedreviews.length : 0
  );
  const reviewId = props.reviewId;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/reviews/${reviewId}`, config)
      .then((res) => {
        const userId = res.data.data.user_id;
        const usersLikes = res.data.data.userslikes;
        res.status === 200 && usersLikes.includes(userId) && setIsClicked(true);
      });
  }, []);

  function handleOnClick() {
    if (isClicked) {
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/reviews/${reviewId}/likes`,
          config
        )
        .then((res) => res.status === 204 && setLikesCount((prev) => prev - 1))
        .catch((e) => {
          console.log(e);
        });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/reviews/likes`,
          {
            reviewId: reviewId,
          },
          config
        )
        .then((res) => {
          res.status === 200 && setLikesCount((prev) => prev + 1);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    setIsClicked(!isClicked);
  }

  return (
    <>
      <StyledLikeBtn onClick={handleOnClick} isClicked={isClicked}>
        {isClicked ? '🧡' : '🤍'}
        {likesCount}
      </StyledLikeBtn>
    </>
  );
}

const StyledLikeBtn = styled.button<{ isClicked: boolean }>`
  background-color: transparent;

  ${(props) =>
    props.isClicked &&
    css`
      animation: scaleAnimation 0.5s linear;
    `}

  @keyframes scaleAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;
