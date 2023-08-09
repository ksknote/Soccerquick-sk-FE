import React from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { Routes, Route } from 'react-router-dom';
import { BodyWrapper } from './Styles/ViewsStyle';
import FindingMember from './Views/FindingMember';
import ViewPage from './Views/ViewPage';
import SubmitPage from './Views/PostPage';
import EditPage from './Views/EditPage';
import HeaderCategory from '../../Components/Commons/HeaderCategory';
function TeamPage() {
  return (
    <>
      <Header />
      <HeaderCategory />
      <BodyWrapper>
        <Routes>
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/edit/*" element={<EditPage />} />
          <Route path="/" element={<FindingMember />} />
          <Route path="/*" element={<ViewPage />} />
        </Routes>
      </BodyWrapper>
      <Footer />
    </>
  );
}

export default TeamPage;
