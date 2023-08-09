import React from 'react';
import ViewPage from '../../../Pages/TeamPage/Views/ViewPage';
import MobileHeader from '../../MobileHeader';
import MyPageHeader from '../MyPageHeader';
import {
  Wrapper,
  MyTeamPostWrapper,
} from '../../../Pages/TeamPage/Styles/ViewsStyle';

function MyApplicatedTeamPost() {
  return (
    <Wrapper>
      <MyPageHeader title="신청한 팀" />
      <MobileHeader title="신청한 팀" />
      <MyTeamPostWrapper>
        <ViewPage />
      </MyTeamPostWrapper>
    </Wrapper>
  );
}

export default MyApplicatedTeamPost;
