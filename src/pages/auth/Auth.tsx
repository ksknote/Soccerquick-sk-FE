import Signup from '../../components/auth/Signup';
import Login from '../../components/auth/Login';
import styled, { css } from 'styled-components';
import { useState } from 'react';

function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleIsLogin = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isLogin) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };

  return (
    <ModalContainer>
      {isLogin && <Login handleIsLogin={handleIsLogin} />}
      {!isLogin && <Signup handleIsLogin={handleIsLogin} />}
    </ModalContainer>
  );
}

export default Auth;

const ModalContainer = styled.div`
  width: 100%;
  max-width: 120rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 5rem 0 10rem 0;
  @media (min-width: 768px) {
    padding-top: 10rem;
  }
`;
