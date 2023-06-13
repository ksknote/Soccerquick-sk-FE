import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MypageIcon from '../styles/icon/mypage.svg';
import SoccerquickLogo from '../styles/icon/soccerquick-logo.png';
import MoreIcon from '../styles/icon/more.svg';
import AuthModal from './AuthModal/AuthModal';
import { MyPageMenu } from './Commons/MyPageMenu';
import { useSelector } from 'react-redux';
import { isLogInSelector } from '../store/selectors/authSelectors';

const Header = () => {
  const [authModal, setAuthModal] = useState<boolean>(false);
  const [myPageMenu, setMyPageMenu] = useState<boolean>(false);
  const myPageMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isLogin = useSelector(isLogInSelector);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLoginModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setAuthModal((prev) => !prev);
    setMyPageMenu((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      myPageMenuRef.current &&
      !myPageMenuRef.current.contains(e.target as Node)
    ) {
      setMyPageMenu(false);
    }
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
  height: 6rem;
  margin: 1.4rem auto;

  display: flex;
  justify-content: space-between;
  align-items: baseline;
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
  width: 10rem;
  padding: 1rem;
  margin: 0.3rem 2rem 0 2rem;
  border-radius: 2.5rem;
  border: 1px solid #e5e5e5;
  & > div {
    text-align: center;
    margin-top: 0.1rem;
    width: 100%;
  }
`;

const HeaderMyPageButton = styled.div`
  display: flex;
  position: relative;
  padding: 0.5rem;
  margin: 0.3rem 2rem 0 2rem;
  border-radius: 2.5rem;
  border: 1px solid #e5e5e5;
  cursor: pointer;
`;
