import styled from 'styled-components';
import TeamList from './TeamPostList';
import { useSelector } from 'react-redux';
import { isLoginSelector } from '../../../redux/modules/auth/selector';
import {
  Button,
  MobileWriteButton,
} from '../../../styles/styled-components/CommonStyle';
import { StyledHeader } from '../Styles/ViewsStyle';
import { useNavigate } from 'react-router-dom';
import pencilIcon from '../../../assets/icon/pencil_white.svg';

function TeamFeed() {
  const navigate = useNavigate();
  const isLogin = useSelector(isLoginSelector);

  return (
    <div>
      <StyledHeader>
        <h1>팀원 모집・신청</h1>
        <h3>싸커퀵에서 함께할 팀을 만들어보세요! 👋🏻</h3>
      </StyledHeader>
      {isLogin && (
        <PcWriteButton
          onClick={() => {
            navigate('./submit');
          }}
        >
          글 작성하기
        </PcWriteButton>
      )}
      <TeamList />
      <MobileWriteButton
        onClick={() => {
          navigate('./submit');
        }}
      >
        <img src={pencilIcon} alt="새 글 작성" />
      </MobileWriteButton>
    </div>
  );
}

export default TeamFeed;

const PcWriteButton = styled(Button.GreenBig)`
  @media (max-width: 767.9px) {
    display: none;
  }
`;
