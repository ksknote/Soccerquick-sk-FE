import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

type MyPageBarProps = {
  handleLoginModal: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleMyPageMenu: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export function MyPageMenu({
  handleMyPageMenu,
  handleLoginModal,
}: MyPageBarProps) {
  const navigate = useNavigate();
  return (
    <StyledMenu onMouseLeave={handleMyPageMenu}>
      <StyledMenuItem onClick={handleLoginModal}>LogIn</StyledMenuItem>
      <StyledMenuItem
        onClick={() => {
          navigate('/mypage');
        }}
      >
        MyPage
      </StyledMenuItem>
    </StyledMenu>
  );
}

const StyledMenu = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  width: 46px;
  height: 70px;
  top: 21px;
  left: -13px;
  z-index: 1000;
`;

const StyledMenuItem = styled.div`
  flex: 1;
  border-bottom: 1px solid rgb(62, 84, 99);
  text-align: center;
  cursor: pointer;
  padding-top: 5px;
  color: rgb(62, 84, 99);
  font-size: 10px;
  &:first-child {
    margin-top: 15px;
  }
`;
