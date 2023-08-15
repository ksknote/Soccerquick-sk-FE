import React from 'react';
import BaseLayout from '../../Components/Template/BaseLayout';
import { Routes, Route } from 'react-router-dom';
import { BodyWrapper } from './Styles/ViewsStyle';
import FindingMember from './Views/FindingMember';
import ViewPage from './Views/ViewPage';
import SubmitPage from './Views/PostPage';
import EditPage from './Views/EditPage';

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
