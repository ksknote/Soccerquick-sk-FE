import React from 'react';
import styled from 'styled-components';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { Routes, Route } from 'react-router-dom';
import FindPage from './Views/SelectCategory';
import TeamList from './Views/TeamList';
import { BodyWrapper } from './Styles/ViewsStyle';
import { Container } from '../../styles/Common/CommonStyle';
import FindingMember from './Views/FindingMember';
import ViewPage from './Views/ViewPage';
import SubmitPage from './Views/PostPage';
import EditPage from './Views/EditPage';
import HeaderCategory from '../../Components/Commons/HeaderCategory';
function TeamPage() {
  const [findingTeam, setFindingTeam] = React.useState<boolean>(true);
  const [findingMember, setFindingMember] = React.useState<boolean>(true);

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
