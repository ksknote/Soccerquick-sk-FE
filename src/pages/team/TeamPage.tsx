import React from 'react';
import BaseLayout from '../../components/template/BaseLayout';
import { Routes, Route } from 'react-router-dom';
import FindingMember from './FindingMember';
import ViewPage from './TeamDetail';
import SubmitPage from './PostPage';
import EditPage from './EditPage';
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
