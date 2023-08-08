import React from 'react';
import styled from 'styled-components';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { Routes, Route } from 'react-router-dom';
import FindPage from './Views/SelectCategory';
import { Wrapper } from './Styles/ViewsStyle';
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
      <MainWrapper>
        <Routes>
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/edit/*" element={<EditPage />} />
          <Route path="/team" element={<FindingMember />} />
          <Route path="/team/*" element={<ViewPage />} />
          <Route
            path="/"
            element={
              <FindPage
                findingTeam={findingTeam}
                findingMember={findingMember}
                setFindingTeam={setFindingTeam}
                setFindingMember={setFindingMember}
              />
            }
          />
        </Routes>
      </MainWrapper>
      <Footer />
    </>
  );
}

export default TeamPage;

const MainWrapper = styled(Wrapper)`
  padding: 2rem 1rem 10rem 1rem;
`;
