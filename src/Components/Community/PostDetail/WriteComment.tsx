import React from 'react';
import { useSelector } from 'react-redux';
import {
  CommentLiContainer,
  StyledImgDiv,
} from '../../../Pages/TeamPage/Styles/ComponentStyle';
import {
  CommentAuthorDiv,
  CommentAuthor,
} from '../../../styles/Common/CommentStyle';
import ballIcon from '../../../styles/icon/soccerball.svg';
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
      <CommentLiContainer>
        <CommentAuthorDiv>
          <StyledImgDiv>
            <img src={ballIcon} alt="BallIcon" />
          </StyledImgDiv>

          <CommentAuthor>{nickname}</CommentAuthor>
        </CommentAuthorDiv>
      </CommentLiContainer>
    );

  return null;
}

export default WriteComment;
