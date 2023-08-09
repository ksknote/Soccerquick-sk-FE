import react, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../ReduxStore/store';
import { fetchData } from '../../../ReduxStore/modules/TeamPage/actions';
import MobileHeader from '../../MobileHeader';
import {
  Wrapper,
  BodyContainer,
  TeamPageBody,
  TeamRecruitContainer,
  TeamRecruitLi,
  ContentHeader,
  RecruitStatus,
  ContentTitle,
  Position,
  Author,
  TeamMemberList,
} from '../../../Pages/TeamPage/Styles/ViewsStyle';
import { GroupPost } from '../../../Pages/MyPage';
import { checkPosition } from '../../../Pages/TeamPage/Views/TeamList';
import MyPageHeader from '../MyPageHeader';
import EmptyBox from '../../Commons/EmptyBox';
import Accepted from '../../../Components/TeamPage/AcceptedMembers';

function SearchMyTeamPost({ filteredItems }: { filteredItems: GroupPost[] }) {
  const [acceptModal, setAcceptModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.data.data);

  const handleTeamDetailClick = (groupId: string) => {
    dispatch(fetchData(groupId));

    setAcceptModal(true);
  };
  return (
    <Wrapper>
      <MyPageHeader
        title="내 팀 모집 글"
        totalItemsCount={filteredItems.length}
      />
      <MobileHeader title="내 팀 모집 글" />
      <BodyContainer>
        <TeamPageBody>
          {filteredItems.length > 0 ? (
            filteredItems.map((team, idx) => (
              <TeamRecruitContainer key={team.group_id}>
                <TeamRecruitLi>
                  <Link
                    to={`/teampage/team/${team.group_id}`}
                    state={{ data: team }}
                  >
                    <ContentHeader>
                      <RecruitStatus status={team.status}>
                        {team.status}
                      </RecruitStatus>
                      <Author>모집자: {team.leader_name}</Author>
                    </ContentHeader>
                    <ContentTitle>
                      <span>{team.location}</span>
                      <p>{team.title}</p>
                    </ContentTitle>
                    <Position>
                      {checkPosition(
                        team.gk_current_count,
                        team.gk_count,
                        team.player_current_count,
                        team.player_count
                      )}
                    </Position>
                  </Link>
                  <TeamMemberList
                    onClick={() => handleTeamDetailClick(team.group_id)}
                  >
                    팀원 명단 (
                    {team.player_current_count + team.gk_current_count}명)
                  </TeamMemberList>
                </TeamRecruitLi>
              </TeamRecruitContainer>
            ))
          ) : (
            <EmptyBox content="검색결과가 없습니다." />
          )}
        </TeamPageBody>
      </BodyContainer>
      {acceptModal && (
        <Accepted
          setAcceptModal={setAcceptModal}
          accept={data.accept}
          total={data.playerNeed + data.gkNeed}
          now={data.player + data.gk}
        />
      )}
    </Wrapper>
  );
}

export default SearchMyTeamPost;
