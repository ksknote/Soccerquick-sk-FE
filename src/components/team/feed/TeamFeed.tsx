import TeamList from './TeamPostList';
import { StyledHeader } from '../Styles/ViewsStyle';
import WritePostButton from '../../common/WritePostButton';

function TeamFeed() {
  return (
    <div>
      <StyledHeader>
        <h1>팀원 모집・신청</h1>
        <h3>싸커퀵에서 함께할 팀을 만들어보세요! 👋🏻</h3>
      </StyledHeader>
      <WritePostButton />
      <TeamList />
      <WritePostButton type="mobile" />
    </div>
  );
}

export default TeamFeed;
