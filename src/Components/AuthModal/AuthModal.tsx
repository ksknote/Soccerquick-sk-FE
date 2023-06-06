import Signup from './Signup';
import Login from './Login';
import styled, { css } from 'styled-components';
import { useState } from 'react';

type AuthModalProps = {
  setAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function AuthModal({ setAuthModal }: AuthModalProps) {
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
      {isLogin && (
        <Login handleIsLogin={handleIsLogin} setAuthModal={setAuthModal} />
      )}
      {!isLogin && (
        <Signup handleIsLogin={handleIsLogin} setAuthModal={setAuthModal} />
      )}
    </ModalContainer>
  );
}

export default AuthModal;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  ${(props) => css`
    @media (max-height: 750px) {
      overflow: auto;
    }
  `}
`;
