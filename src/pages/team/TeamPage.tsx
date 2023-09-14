import React from 'react';
import BaseLayout from '../../components/template/BaseLayout';
import { Routes, Route } from 'react-router-dom';
import FindingMember from '../../components/team/feed/TeamFeed';
import ViewPage from '../../components/team/postDetail/TeamDetail';
import WriteTeamPost from '../../components/team/writingForm/WriteTeamPost';
import { BodyWrapper } from '../../styles/styled-components/CommonStyle';
function TeamPage() {
  return (
    <BaseLayout>
      <BodyWrapper>
        <Routes>
          <Route path="/submit" element={<WriteTeamPost />} />
          <Route path="/edit/*" element={<WriteTeamPost />} />
          <Route path="/" element={<FindingMember />} />
          <Route path="/*" element={<ViewPage />} />
        </Routes>
      </BodyWrapper>
    </BaseLayout>
  );
}

export default TeamPage;
