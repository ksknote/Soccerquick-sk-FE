import React from 'react';
import ViewPage from '../../team/postDetail/TeamDetail';
import MobileHeader from '../../MobileHeader';
import MyPageHeader from '../MyPageHeader';
import { MyTeamPostWrapper } from '../../team/Styles/ViewsStyle';

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
