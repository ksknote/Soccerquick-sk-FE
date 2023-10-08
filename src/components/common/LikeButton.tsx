import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import {
  userSelector,
  isLoginSelector,
} from '../../redux/modules/auth/selector';
import { useSelector } from 'react-redux';

interface LikeButtonProps {
  likedreviews: string[];
  reviewId?: string;
}

interface LikedUser {
  _id: string; // Replace 'string' with the actual type of _id
  user_id: string;
  // Other properties of the user object
}

const config = {
  withCredentials: true,
};

export default function LikeButton(props: LikeButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const reviewId = props.reviewId;
  const isLogin = useSelector(isLoginSelector);
  const userData = useSelector(userSelector);
  const userId = userData?.user_id;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/reviews/${reviewId}`, config)
      .then((res) => {
        const likedArray = res.data.data.likedreviews;
        const usersLikes = likedArray.map((user: LikedUser) => user.user_id);
        if (usersLikes.includes(userId)) setIsClicked(true);
        setLikesCount(likedArray.length);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  function handleOnClick() {
    if (isLogin)
      if (isClicked) {
        axios
          .delete(
            `${process.env.REACT_APP_API_URL}/reviews/${reviewId}/likes`,
            config
          )
          .then(
            (res) => res.status === 204 && setLikesCount((prev) => prev - 1)
          )
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
        {isClicked && isLogin ? '🧡' : '🤍'}
        &nbsp;
        {likesCount}
      </StyledLikeBtn>
    </>
  );
}

const StyledLikeBtn = styled.button<{ isClicked: boolean }>`
  background-color: transparent;
  font-size: 1.3rem;

  ${(props) =>
    props.isClicked &&
    css`
      animation: heartBeat 0.5s linear;
    `}

  @keyframes heartBeat {
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

  &:hover {
    font-size: calc(1.5rem * 1.2);
  }
  @media (min-width: 1024px) {
    font-size: 1.5rem;
    &:hover {
      font-size: calc(1.3rem * 1.2);
    }
  }
`;
