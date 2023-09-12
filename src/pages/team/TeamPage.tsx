import React from 'react';
import BaseLayout from '../../components/template/BaseLayout';
import { Routes, Route } from 'react-router-dom';
import FindingMember from '../../components/team/feed/TeamFeed';
import ViewPage from '../../components/team/postDetail/TeamDetail';
import SubmitPage from '../../components/team/writingForm/PostPage';
import EditPage from '../../components/team/writingForm/EditPage';
import { BodyWrapper } from '../../styles/styled-components/CommonStyle';
function TeamPage() {
  return (
    <BaseLayout>
      <BodyWrapper>
        <Routes>
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/edit/*" element={<EditPage />} />
          <Route path="/" element={<FindingMember />} />
          <Route path="/*" element={<ViewPage />} />
        </Routes>
      </BodyWrapper>
    </BaseLayout>
  );
}

export default TeamPage;
