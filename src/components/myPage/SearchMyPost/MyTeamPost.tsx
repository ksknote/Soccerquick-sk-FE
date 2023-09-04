import React from 'react';
import ViewPage from '../../../pages/team/Views/ViewPage';
import MobileHeader from '../../MobileHeader';
import MyPageHeader from '../MyPageHeader';
import { MyTeamPostWrapper } from '../../../pages/team/Styles/ViewsStyle';

function MyTeamPost() {
  return (
    <>
      <MyPageHeader title="내 팀 모집 글" />
      <MobileHeader title="내 팀 모집 글" />
      <MyTeamPostWrapper>
        <ViewPage />
      </MyTeamPostWrapper>
    </>
  );
}

export default MyTeamPost;
