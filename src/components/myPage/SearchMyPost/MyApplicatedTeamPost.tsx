import React from 'react';
import TeamDetail from '../../team/postDetail/TeamDetail';
import MobileHeader from '../../common/MobilePageHeader';
import MyPageHeader from '../MyPageHeader';
import { MyTeamPostWrapper } from '../../team/Styles/ViewsStyle';

function MyApplicatedTeamPost() {
  return (
    <>
      <MyPageHeader title="신청한 팀" />
      <MobileHeader title="신청한 팀" />
      <MyTeamPostWrapper>
        <TeamDetail />
      </MyTeamPostWrapper>
    </>
  );
}

export default MyApplicatedTeamPost;
