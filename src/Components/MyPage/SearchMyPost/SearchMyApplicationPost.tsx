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
} from '../../../Pages/TeamPage/Styles/ViewsStyle';
import EmptyBox from '../../Commons/EmptyBox';

function SearchMyApplicationPost({
  filteredItems,
}: {
  filteredItems: GroupPost[];
}) {
  console.log(filteredItems);
  return (
    <Wrapper>
      <MyPageHeader title="신청한 팀" totalItemsCount={filteredItems.length} />
      <MobileHeader title="신청한 팀" />
      <BodyContainer>
        <TeamPageBody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <TeamRecruitContainer key={item.group_id}>
                <Link
                  to={`/teampage/team/${item.group_id}`}
                  state={{ data: item }}
                >
                  <TeamRecruitLi>
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
                  </TeamRecruitLi>
                </Link>
              </TeamRecruitContainer>
            ))
          ) : (
            <EmptyBox content="검색결과가 없습니다." />
          )}
        </TeamPageBody>
      </BodyContainer>
    </Wrapper>
  );
}

export default SearchMyApplicationPost;
