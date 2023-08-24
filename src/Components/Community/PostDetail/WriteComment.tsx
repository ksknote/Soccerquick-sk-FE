import React from 'react';
import { useSelector } from 'react-redux';
import ballIcon from '../../../styles/icon/soccerball.svg';
import { BoxContainer } from '../../../styles/Common/CommonStyle';
import { Comment } from '../../../styles/Common/CommentStyle';
import {
  userSelector,
  isLogInSelector,
} from '../../../ReduxStore/modules/Auth/authSelectors';

function WriteComment() {
  const userData = useSelector(userSelector);
  const isLogin = useSelector(isLogInSelector);
  const nickname = userData?.nickname;
  if (isLogin)
    return (
      <BoxContainer>
        <Comment.AuthorDiv>
          <Comment.ImgDiv>
            <img src={ballIcon} alt="BallIcon" />
          </Comment.ImgDiv>
          <Comment.Author>{nickname}</Comment.Author>
        </Comment.AuthorDiv>
      </BoxContainer>
    );

  return null;
}

export default WriteComment;
