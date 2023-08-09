import React from 'react';
import ViewPage from '../../../Pages/TeamPage/Views/ViewPage';
import MobileHeader from '../../MobileHeader';
import MyPageHeader from '../MyPageHeader';
import {
  Wrapper,
  MyTeamPostWrapper,
} from '../../../Pages/TeamPage/Styles/ViewsStyle';

function MyTeamPost() {
  return (
    <Wrapper>
      <MyPageHeader title="내 팀 모집 글" />
      <MobileHeader title="내 팀 모집 글" />
      <MyTeamPostWrapper>
        <ViewPage />
      </MyTeamPostWrapper>
    </Wrapper>
  );
}

export default MyTeamPost;
