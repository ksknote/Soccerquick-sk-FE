import React from 'react';
import ViewPage from '../../../Pages/TeamPage/Views/ViewPage';
import MobileHeader from '../../MobileHeader';
import MyPageHeader from '../MyPageHeader';
import { MyTeamPostWrapper } from '../../../Pages/TeamPage/Styles/ViewsStyle';

function MyApplicatedTeamPost() {
  return (
    <>
      <MyPageHeader title="신청한 팀" />
      <MobileHeader title="신청한 팀" />
      <MyTeamPostWrapper>
        <ViewPage />
      </MyTeamPostWrapper>
    </>
  );
}

export default MyApplicatedTeamPost;
