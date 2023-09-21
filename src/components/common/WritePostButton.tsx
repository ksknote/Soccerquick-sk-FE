import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { isLoginSelector } from '../../redux/modules/auth/selector';
import {
  Button,
  MobileWriteButton,
} from '../../styles/styled-components/CommonStyle';
import pencilIcon from '../../assets/icon/pencil_white.svg';

function WritePostButton({ type }: { type?: string }) {
  const navigate = useNavigate();
  const isLogin = useSelector(isLoginSelector);

  if (!isLogin) return null;

  if (type === 'mobile')
    return (
      <MobileWriteButton
        onClick={() => {
          navigate('./submit');
        }}
      >
        <img src={pencilIcon} alt="새 글 작성" />
      </MobileWriteButton>
    );

  return (
    <PcWriteButton
      onClick={() => {
        navigate('./submit');
      }}
    >
      글 작성하기
    </PcWriteButton>
  );
}

const PcWriteButton = styled(Button.GreenBig)`
  @media (max-width: 767.9px) {
    display: none;
  }
`;

export default WritePostButton;
