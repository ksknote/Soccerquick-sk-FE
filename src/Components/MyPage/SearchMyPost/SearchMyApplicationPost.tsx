import react from 'react';
import { Link } from 'react-router-dom';
import { checkPosition } from '../../../Pages/TeamPage/Views/TeamList';
import { GroupPost } from '../../../Pages/MyPage';
import MyPageHeader from '../MyPageHeader';
import MobileHeader from '../../MobileHeader';
import {
  Wrapper,
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
} from '../../../Pages/TeamPage/Styles/ViewsStyle';
import EmptyBox from '../../Commons/EmptyBox';

function SearchMyApplicationPost({
  filteredItems,
}: {
  filteredItems: GroupPost[];
}) {
  const handleCopy = async (phoneNumber: string) => {
    try {
      await navigator.clipboard.writeText(phoneNumber);

      alert('복사 성공!');
    } catch (error) {
      alert('복사 실패!');
    }
  };

  return (
    <Wrapper>
      <MyPageHeader title="신청한 팀" totalItemsCount={filteredItems.length} />
      <MobileHeader title="신청한 팀" />
      <BodyContainer>
        <TeamPageBody>
          <TeamRecruitContainer>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => (
                <TeamRecruitLi key={item.group_id}>
                  <Link to={`./${item.group_id}`} state={{ data: item }}>
                    <ContentHeader>
                      <StatusContainer>
                        <RecruitStatus status={item.status}>
                          {item.status}
                        </RecruitStatus>
                        <AcceptStatus status={item.accept.length}>
                          {item.accept.length === 1 ? '수락됨' : '신청 중'}
                        </AcceptStatus>
                      </StatusContainer>
                      <Author>모집자: {item.leader_name}</Author>
                    </ContentHeader>
                    <ContentTitle>
                      <span>{item.location}</span>
                      {item.title}
                    </ContentTitle>
                    <Position>
                      {checkPosition(
                        item.gk_current_count,
                        item.gk_count,
                        item.player_current_count,
                        item.player_count
                      )}
                    </Position>
                  </Link>
                  {item.accept.length === 1 ? (
                    <AcceptedDespcription>
                      ⚽ 팀에 합류되었습니다! ⚽ <br />
                      <br />
                      아직 팀 리더에게 연락이 오지 않았다면, 아래 연락처로
                      메시지를 보내보세요. <br />팀 리더 {item.leader_name}님의
                      연락처는{' '}
                      <span
                        onClick={() => handleCopy(item.leader_phone_number)}
                      >
                        {item.leader_phone_number}
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
    </Wrapper>
  );
}

export default SearchMyApplicationPost;
