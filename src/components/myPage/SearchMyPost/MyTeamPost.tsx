import React from 'react';
import TeamDetail from '../../team/postDetail/TeamDetail';
import MobileHeader from '../../common/MobilePageHeader';
import MyPageHeader from '../MyPageHeader';
import { MyTeamPostWrapper } from '../../team/Styles/ViewsStyle';

function MyTeamPost() {
  return (
    <>
      <MyPageHeader title="내 팀 모집 글" />
      <MobileHeader title="내 팀 모집 글" />
      <MyTeamPostWrapper>
        <TeamDetail />
      </MyTeamPostWrapper>
    </>
  );
}

export default MyTeamPost;
