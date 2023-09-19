import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  StyledTotalNumber,
  TeamPageBody,
  OptionContainer,
  TeamRecruitContainer,
  TeamRecruitLi,
  ContentHeader,
  RecruitStatus,
  ContentTitle,
  Position,
  Author,
} from '../Styles/ViewsStyle';
import MyPagination from '../../myPages/MyPagination';
import EmptyBox from '../../common/EmptyBox';
import CheckPositionStatus from './CheckPostionStatus';
import { TeamDataType, FilteringOptionType } from '../../../types/TeamPageType';
import axios from 'axios';
import TeamPostFilter from './TeamPostFilter';

function TeamList() {
  const [teamData, setTeamData] = useState<TeamDataType[]>([]);
  const [filteredData, setFilteredData] = React.useState(teamData);
  const [filteringOption, setFilteringOption] = useState<FilteringOptionType>({
    status: null,
    region: null,
    city: null,
  });

  // 페이지네이션 구현 부분
  const [currentPage, setCurrentPage] = React.useState(1); // 현재 페이지 상태
  // const [currentData, setCurrentData] = React.useState<DataProps[]>([]); // 초기 데이터
  const [totalPage, setTotalPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(8);
  const lastIndexOfData = currentPage * itemsPerPage;
  const firstIndexOfData = lastIndexOfData - itemsPerPage;
  const currentData = filteredData.slice(firstIndexOfData, lastIndexOfData);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/groups`)
      .then((res) => {
        setTeamData(res.data.data);
      })
      .catch((error) => {
        setTeamData([]);
      });
  }, []);

  useEffect(() => {
    const newFilteredData = teamData.filter((team) => {
      const optionKeys = Object.keys(filteringOption);
      for (let key of optionKeys) {
        if (!filteringOption[key]) continue;
        if (filteringOption[key] === '전체') continue;
        if (team[key] !== filteringOption[key]) {
          return false;
        } else continue;
      }
      return true;
    });
    setFilteredData(newFilteredData.reverse());
  }, [teamData, filteringOption]);

  return (
    <div>
      <OptionContainer>
        <StyledTotalNumber>
          총&nbsp; <b>{filteredData.length}</b>건
        </StyledTotalNumber>
        <TeamPostFilter setFilteringOption={setFilteringOption} />
      </OptionContainer>
      <TeamPageBody>
        <TeamRecruitContainer>
          {filteredData.length > 0 ? (
            currentData.map((item, idx) => (
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
                      item.gk_current_count,
                      item.gk_count,
                      item.player_current_count,
                      item.player_count
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
    </div>
  );
}

export default TeamList;
