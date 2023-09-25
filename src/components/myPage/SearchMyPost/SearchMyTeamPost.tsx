import react, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { fetchData } from '../../../redux/modules/team/actions';
import MobileHeader from '../../MobileHeader';
import {
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
} from '../../team/Styles/ViewsStyle';
import { TeamDataType } from '../../../types/TeamPageType';
import MyPageHeader from '../MyPageHeader';
import EmptyBox from '../../common/EmptyBox';
import MemberListModal from '../../team/postDetail/MemberListModal';
import CheckPositionStatus from '../../team/feed/CheckPostionStatus';

function SearchMyTeamPost({
  filteredItems,
}: {
  filteredItems: TeamDataType[];
}) {
  const [acceptModal, setAcceptModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const teamData = useSelector((state: RootState) => state.teamPost.data);
  const navigate = useNavigate();

  const handleTeamDetailClick = (groupId: string) => {
    dispatch(fetchData(groupId));
    setAcceptModal(true);
  };
  return (
    <>
      <MyPageHeader
        title="내 팀 모집 글"
        totalItemsCount={filteredItems.length}
      />
      <MobileHeader title="내 팀 모집 글" />
      <BodyContainer>
        <TeamPageBody>
          <TeamRecruitContainer>
            {filteredItems.length > 0 ? (
              filteredItems.map((team, idx) => (
                <TeamRecruitLi key={team.group_id}>
                  <ContentHeader>
                    <RecruitStatus status={team.status}>
                      {team.status}
                    </RecruitStatus>
                    <Author>모집자: {team.leader_name}</Author>
                  </ContentHeader>
                  <ContentTitle
                    onClick={() =>
                      navigate(`./${team.group_id}`, { state: { data: team } })
                    }
                  >
                    <span>{team.region + ' ' + team.city}</span>
                    <p>{team.title}</p>
                  </ContentTitle>
                  <Position>
                    {CheckPositionStatus(
                      team.recruitment_count.gk_current_count,
                      team.recruitment_count.gk_count,
                      team.recruitment_count.player_current_count,
                      team.recruitment_count.player_count
                    )}
                  </Position>
                  <TeamMemberList
                    onClick={() => handleTeamDetailClick(team.group_id)}
                  >
                    팀원 명단 (
                    {team.recruitment_count.player_current_count +
                      team.recruitment_count.gk_current_count}
                    명)
                  </TeamMemberList>
                </TeamRecruitLi>
              ))
            ) : (
              <EmptyBox content="검색결과가 없습니다." />
            )}
          </TeamRecruitContainer>
        </TeamPageBody>
      </BodyContainer>
      {acceptModal && (
        <MemberListModal
          setAcceptModal={setAcceptModal}
          accept={teamData.accept}
          total={teamData.player_count + teamData.gk_count}
          now={teamData.player_current_count + teamData.gk_current_count}
        />
      )}
    </>
  );
}

export default SearchMyTeamPost;
