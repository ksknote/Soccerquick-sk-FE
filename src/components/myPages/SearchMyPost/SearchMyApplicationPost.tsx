import react from 'react';
import { useNavigate } from 'react-router-dom';
import { GroupPost } from '../../../pages/MyPage';
import MyPageHeader from '../MyPageHeader';
import MobileHeader from '../../MobileHeader';
import {
  BodyContainer,
  TeamPageBody,
  TeamRecruitContainer,
  TeamRecruitLi,
  ContentHeader,
  StatusContainer,
  RecruitStatus,
  AcceptStatus,
  ContentTitle,
  Position,
  Author,
  AcceptedDespcription,
} from '../../team/Styles/ViewsStyle';
import EmptyBox from '../../common/EmptyBox';
import CheckPositionStatus from '../../team/feed/CheckPostionStatus';

function SearchMyApplicationPost({
  filteredItems,
}: {
  filteredItems: GroupPost[];
}) {
  const navigate = useNavigate();
  const handleCopy = async (phoneNumber: string) => {
    try {
      await navigator.clipboard.writeText(phoneNumber);

      alert('복사 성공!');
    } catch (error) {
      alert('복사 실패!');
    }
  };

  return (
    <>
      <MyPageHeader title="신청한 팀" totalItemsCount={filteredItems.length} />
      <MobileHeader title="신청한 팀" />
      <BodyContainer>
        <TeamPageBody>
          <TeamRecruitContainer>
            {filteredItems.length > 0 ? (
              filteredItems.map((team, idx) => (
                <TeamRecruitLi key={team.group_id}>
                  <ContentHeader>
                    <StatusContainer>
                      <RecruitStatus status={team.status}>
                        {team.status}
                      </RecruitStatus>
                      <AcceptStatus status={team.accept.length}>
                        {team.accept.length === 1 ? '수락됨' : '신청 중'}
                      </AcceptStatus>
                    </StatusContainer>
                    <Author>모집자: {team.leader_name}</Author>
                  </ContentHeader>
                  <ContentTitle
                    onClick={() =>
                      navigate(`./${team.group_id}`, { state: { data: team } })
                    }
                  >
                    <span>{team.location}</span>
                    {team.title}
                  </ContentTitle>
                  <Position>
                    {CheckPositionStatus(
                      team.gk_current_count,
                      team.gk_count,
                      team.player_current_count,
                      team.player_count
                    )}
                  </Position>
                  {team.accept.length === 1 ? (
                    <AcceptedDespcription>
                      ⚽ 팀에 합류되었습니다! ⚽ <br />
                      <br />
                      아직 팀 리더에게 연락이 오지 않았다면, 아래 연락처로
                      메시지를 보내보세요. <br />팀 리더 {team.leader_name}님의
                      연락처는{' '}
                      <span
                        onClick={() => handleCopy(team.leader_phone_number)}
                      >
                        {team.leader_phone_number}
                      </span>
                      입니다.
                      <br />
                      연락 시 매너를 꼭 지켜주세요 😇
                    </AcceptedDespcription>
                  ) : (
                    <AcceptedDespcription>
                      수락 대기 중입니다.
                    </AcceptedDespcription>
                  )}
                </TeamRecruitLi>
              ))
            ) : (
              <EmptyBox content="검색결과가 없습니다." />
            )}
          </TeamRecruitContainer>
        </TeamPageBody>
      </BodyContainer>
    </>
  );
}

export default SearchMyApplicationPost;
