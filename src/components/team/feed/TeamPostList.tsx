import { Link } from 'react-router-dom';
import {
  TeamPageBody,
  TeamRecruitContainer,
  TeamRecruitLi,
  ContentHeader,
  RecruitStatus,
  ContentTitle,
  Position,
  Author,
} from '../Styles/ViewsStyle';
import EmptyBox from '../../common/EmptyBox';
import CheckPositionStatus from './CheckPostionStatus';
import { TeamDataType } from '../../../types/TeamPageType';

function TeamList({ filteredData }: { filteredData: TeamDataType[] }) {
  return (
    <TeamPageBody>
      <TeamRecruitContainer>
        {filteredData.length > 0 ? (
          filteredData.map((item, idx) => (
            <Link
              key={item.group_id}
              to={`./${item.group_id}`}
              state={{ data: item }}
            >
              <TeamRecruitLi>
                <ContentHeader>
                  <RecruitStatus status={item.status}>
                    {item.status}
                  </RecruitStatus>
                  <Author>모집자: {item.leader_name}</Author>
                </ContentHeader>
                <ContentTitle>
                  <span>{item.region + ' ' + item.city}</span>
                  <p>{item.title}</p>
                </ContentTitle>
                <Position>
                  {CheckPositionStatus(
                    item.recruitment_count.gk_current_count,
                    item.recruitment_count.gk_count,
                    item.recruitment_count.player_current_count,
                    item.recruitment_count.player_count
                  )}
                </Position>
              </TeamRecruitLi>
            </Link>
          ))
        ) : (
          <EmptyBox content="검색결과가 없습니다." />
        )}
      </TeamRecruitContainer>
    </TeamPageBody>
  );
}

export default TeamList;
