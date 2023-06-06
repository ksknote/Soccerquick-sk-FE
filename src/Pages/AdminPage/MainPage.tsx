import React from 'react';
import styled from 'styled-components';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import AdminMainPage from '../../Components/AdminPage/Contents/AdminMainPage';
import AdminTeamManager from '../../Components/AdminPage/Contents/AdminTeamManagePage';
import AdminUserManager from '../../Components/AdminPage/Contents/AdminUserManagePage';
import { Routes, Route, Link } from 'react-router-dom';

function AdminPage() {
  return (
    <>
      <Header />
      <AdminContainer>
        <BodyContainer>
          <BodyLeftBar>
            <Link to="/admin">
              <button
                style={{ margin: '2rem 2rem', width: '14rem', height: '4rem' }}
              >
                관리자 메인
              </button>
            </Link>
            <Link to="/admin/user">
              <button
                style={{ margin: '2rem 2rem', width: '14rem', height: '4rem' }}
              >
                유저 관리
              </button>
            </Link>
            <Link to="/admin/team">
              <button
                style={{ margin: '2rem 2rem', width: '14rem', height: '4rem' }}
              >
                등록된 팀 관리
              </button>
            </Link>
            <button
              style={{ margin: '2rem 2rem', width: '14rem', height: '4rem' }}
              onClick={() => {
                alert('ㄱㅁㅇ');
              }}
            >
              고마오 관리
            </button>
          </BodyLeftBar>
          <BodyMain>
            <Routes>
              <Route path="/user" element={<AdminUserManager />} />
              <Route path="/team" element={<AdminTeamManager />} />
              <Route path="/" element={<AdminMainPage />} />
            </Routes>
          </BodyMain>
        </BodyContainer>
      </AdminContainer>
      <Footer />
    </>
  );
}

export default AdminPage;

const AdminContainer = styled.div`
  font-size: 3rem;
`;

// const HeaderContainer = styled.div`
//   display: flex;
//   width: 100%;
//   height: 3em;
//   top: 0;
//   background-color: beige;
// `;

const BodyContainer = styled.div`
  background-color: skyblue;
  height: fit-content;
`;

const BodyLeftBar = styled.div`
  display: flex;
  float: left;
  width: 10%;
  height: 80rem;
  flex-direction: column;
  align-items: center;
  background-color: yellowgreen;
`;

// const FooterContainer = styled.div`
//   display: flex;
//   position: fixed;
//   width: 100%;
//   height: 6rem;
//   bottom: 0;
//   background-color: grey;
// `;

const BodyMain = styled.div`
  background-color: rgb(245, 245, 245);
  height: 80rem;
`;
