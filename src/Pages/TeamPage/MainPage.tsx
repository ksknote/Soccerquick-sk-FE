import React from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { Routes, Route } from 'react-router-dom';
import FindPage from './Views/SelectCategory';
import { MainPageBody } from './Styles/ViewsStyle';
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
      <MainPageBody>
        <Routes>
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/team" element={<FindingMember />} />
          <Route path="/team/:id" element={<ViewPage />} />
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
      </MainPageBody>
      <Footer />
    </>
  );
}

export default TeamPage;
