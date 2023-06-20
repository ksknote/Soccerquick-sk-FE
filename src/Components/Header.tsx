import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MypageIcon from '../styles/icon/mypage.svg';
import SoccerquickLogo from '../styles/icon/soccerquick-logo.png';
import AuthModal from './AuthModal/AuthModal';
import { MyPageMenu } from './Commons/MyPageMenu';
import { useSelector } from 'react-redux';
import { isLogInSelector } from '../ReduxStore/modules/Auth/authSelectors';

const Header = () => {
  const [authModal, setAuthModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const isLogin = useSelector(isLogInSelector);

  const handleLoginModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setAuthModal((prev) => !prev);
  };

  return (
    <HeaderContainer>
      <LogoMain>
        <div onClick={() => navigate('/')}>
          <img src={SoccerquickLogo} alt="SoccerQuick" />
        </div>
      </LogoMain>
      <HeaderMenu>
        <HeaderMyPage>
          {isLogin ? (
            <MyPageMenu />
          ) : (
            <HeaderLoginButton onClick={handleLoginModal}>
              <img src={MypageIcon} alt="my" />
              <div>로그인</div>
            </HeaderLoginButton>
          )}
        </HeaderMyPage>
      </HeaderMenu>
      {authModal && <AuthModal setAuthModal={setAuthModal} />}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 98.4rem;
  padding: 0 2rem;
  height: 7rem;
  margin: 1.4rem auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoMain = styled.div`
  img {
    width: 13rem;
    height: 6rem;
    vertical-align: middle;
    cursor: pointer;
  }
`;

const HeaderMenu = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 1.1rem;
  img {
    width: 2.5rem;
    height: 100%;
    margin-right: 0.2rem;
  }
`;

const HeaderMyPage = styled.div``;

const HeaderLoginButton = styled.div`
  display: flex;
  position: relative;
  width: 12rem;
  padding: 0.7rem 0rem 0.7rem 1.5rem;
  margin: 0.3rem 0;
  border-radius: 2.5rem;
  border: 1px solid #e5e5e5;
  cursor: pointer;
  transition: background-color 0.3s ease;
  & > div {
    text-align: center;
    margin-top: 0.2rem;
    padding-left: 1.5rem;
    font-size: 1.4rem;
  }

  &:hover {
    background-color: #e5e5e5;
  }
`;
