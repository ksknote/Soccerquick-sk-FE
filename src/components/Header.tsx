import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MypageIcon from '../assets/icon/mypage.svg';
import SoccerquickLogo from '../assets/icon/logo/logo_icon_text.png';
import { MyPageMenu } from './common/MyPageMenu';
import { useSelector } from 'react-redux';
import { isLoginSelector } from '../redux/modules/auth/selector';

const Header = () => {
  const navigate = useNavigate();
  const isLogin = useSelector(isLoginSelector);

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
            <HeaderLoginButton onClick={() => navigate('/auth')}>
              <img src={MypageIcon} alt="my" />
              <div>로그인</div>
            </HeaderLoginButton>
          )}
        </HeaderMyPage>
      </HeaderMenu>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  max-width: 120rem;
  padding: 0 2rem;
  height: 7rem;
  margin: 1.4rem auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoMain = styled.div`
  img {
    width: 35%;
    height: 35%;
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
    height: 100%;
    margin-right: 0.2rem;
  }
`;

const HeaderMyPage = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

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
