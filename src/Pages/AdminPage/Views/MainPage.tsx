import React from 'react';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';
import AdminMainPage from '../../../Components/AdminPage/AdminMainPage';
import AdminUserManager from '../../../Components/AdminPage/AdminUserManagePage';
import { Routes, Route, Link } from 'react-router-dom';
import {
  AdminContainer,
  BodyContainer,
  BodyLeftBar,
  BodyMain,
  MainButton,
  UserButton,
} from '../Styles/AdminPageStyle';

function AdminPage() {
  const [mainButton, setMainButton] = React.useState(true);
  const [userButton, setUserButton] = React.useState(false);
  return (
    <>
      <Header />
      <AdminContainer>
        <BodyContainer>
          <BodyLeftBar>
            <Link to="/admin">
              <MainButton
                style={{ width: '14rem', height: '4rem' }}
                onClick={() => {
                  setMainButton(true);
                  setUserButton(false);
                }}
                state={mainButton ? 'true' : 'false'}
              >
                🔒관리자 메인
              </MainButton>
            </Link>
            <Link to="/admin/user">
              <UserButton
                style={{ width: '14rem', height: '4rem' }}
                onClick={() => {
                  setMainButton(false);
                  setUserButton(true);
                }}
                state={userButton ? 'true' : 'false'}
              >
                🔨유저 관리
              </UserButton>
            </Link>
          </BodyLeftBar>
          <BodyMain>
            <Routes>
              <Route path="/user" element={<AdminUserManager />} />
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
