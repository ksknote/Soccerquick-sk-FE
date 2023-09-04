import React from 'react';
import BaseLayout from '../../components/Template/BaseLayout';
import { Routes, Route } from 'react-router-dom';
import FindingMember from './Views/FindingMember';
import ViewPage from './Views/ViewPage';
import SubmitPage from './Views/PostPage';
import EditPage from './Views/EditPage';
import { BodyWrapper } from '../../styles/Common/CommonStyle';
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
