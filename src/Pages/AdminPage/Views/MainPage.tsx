import React from 'react';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';
import AdminMainPage from '../../../Components/AdminPage/AdminMainPage';
import AdminUserManager from '../../../Components/AdminPage/AdminUserManagePage';
import { Routes, Route, Link } from 'react-router-dom';
import { Container } from '../../../styles/Common/CommonStyle';
import {
  AdminContainer,
  BodyContainer,
  BodyLeftBar,
  BodyMain,
  MainButton,
  UserButton,
} from '../Styles/AdminPageStyle';
import { userSelector } from '../../../ReduxStore/modules/Auth/authSelectors';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const [mainButton, setMainButton] = React.useState(true);
  const [userButton, setUserButton] = React.useState(false);
  const userData = useSelector(userSelector);
  const navigate = useNavigate();

  // 현재 권한이 관리자가 아닐 경우 메인 페이지로 팅기도록 설정
  React.useEffect(() => {
    if (userData?.role === 'admin' || userData?.role === 'manager') {
    } else {
      navigate('/');
    }
  }, [userData]);
  return (
    <Container>
      <Header />
      <div>
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
      </div>
      <Footer />
    </Container>
  );
}

export default AdminPage;
