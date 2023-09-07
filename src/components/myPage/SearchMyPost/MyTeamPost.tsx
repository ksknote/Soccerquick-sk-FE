import React from 'react';
import ViewPage from '../../team/postDetail/TeamDetail';
import MobileHeader from '../../MobileHeader';
import MyPageHeader from '../MyPageHeader';
import { MyTeamPostWrapper } from '../../team/Styles/ViewsStyle';

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
