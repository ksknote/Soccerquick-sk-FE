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
  Status,
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
  return (
    <Wrapper>
      <MyPageHeader title="신청한 팀" totalItemsCount={filteredItems.length} />
      <MobileHeader title="신청한 팀" />
      <BodyContainer>
        <TeamPageBody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <TeamRecruitContainer>
                <Link to={`./${item.group_id}`} state={{ data: item }}>
                  <TeamRecruitLi>
                    <ContentHeader>
                      <Status status={item.status}>{item.status}</Status>
                      <Author>모집자: {item.leader_name}</Author>
                    </ContentHeader>
                    <ContentTitle>
                      <span>{item.location}</span>
                      <p>{item.title}</p>
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
