import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DropDown from '../../common/DropDown';
import resetIcon from '../../../assets/icon/reset_black.svg';
import {
  StyledTotalNumber,
  TeamPageBody,
  TeamPageOption,
  StyledResetButton,
  OptionContainer,
  TeamRecruitContainer,
  TeamRecruitLi,
  ContentHeader,
  RecruitStatus,
  ContentTitle,
  Position,
  Author,
} from '../Styles/ViewsStyle';
import { Button } from '../../../styles/styled-components/CommonStyle';
import { useSelector } from 'react-redux';
import { isLoginSelector } from '../../../redux/modules/auth/selector';
import MyPagination from '../../myPages/MyPagination';
import EmptyBox from '../../common/EmptyBox';
import CheckPositionStatus from './CheckPostionStatus';
import { TeamDataType } from '../../../types/TeamPageType';
import axios from 'axios';
import RegionSelect from '../../common/RegionSelect';
import { Select } from '../../common/RegionSelect';

type filteringOptionType = {
  [key: string]: string | null;
};

function TeamList() {
  const navigate = useNavigate();
  const isLogin = useSelector(isLoginSelector);

  const [teamData, setTeamData] = useState<TeamDataType[]>([]);
  const [status, setStatus] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [filteringOption, setFilteringOption] = useState<filteringOptionType>({
    status: null,
    region: null,
    city: null,
  });

  useEffect(() => {
    setFilteringOption((prev) => {
      const newFilteringOption = {
        ...prev,
        status: status,
        region: selectedRegion,
        city: selectedCity,
      };
      return newFilteringOption;
    });
  }, [status, selectedRegion, selectedCity]);

  function handleReset() {
    setStatus('');
    setSelectedCity('');
    setSelectedRegion('');
  }

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

  // 필터링 된 데이터를 관리하는 상태
  const [filteredData, setFilteredData] = React.useState(teamData);
  // 페이지네이션 구현 부분
  const [currentPage, setCurrentPage] = React.useState(1); // 현재 페이지 상태
  // const [currentData, setCurrentData] = React.useState<DataProps[]>([]); // 초기 데이터
  const [totalPage, setTotalPage] = React.useState(0);

  const [itemsPerPage, setItemsPerPage] = React.useState(8);
  const lastIndexOfData = currentPage * itemsPerPage;
  const firstIndexOfData = lastIndexOfData - itemsPerPage;
  const currentData = filteredData.slice(firstIndexOfData, lastIndexOfData);

  const statusOption = ['모집중', '모집완료'];

  useEffect(() => {
    const newFilteredData = teamData.filter((team) => {
      const optionKeys = Object.keys(filteringOption);
      for (let key of optionKeys) {
        console.log(team[key], filteringOption[key]);
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
      {isLogin && (
        <Button.GreenBig
          onClick={() => {
            navigate('/teampage/submit');
          }}
        >
          글 작성하기
        </Button.GreenBig>
      )}
      <OptionContainer>
        <StyledTotalNumber>
          총&nbsp; <b>{filteredData.length}</b>건
        </StyledTotalNumber>
        <TeamPageOption>
          {/* {dropdownList.map((list, idx) => (
            <DropDown
              key={idx}
              list={list.option}
              selected={list.state}
              setSelected={list.setState}
            />
          ))} */}
          <Select onChange={(e) => setStatus(e.target.value)} value={status}>
            <option value="">모집 상태</option>
            {statusOption.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
          <RegionSelect
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />

          <StyledResetButton onClick={handleReset}>
            <img src={resetIcon} alt="" />
            <p>초기화</p>
          </StyledResetButton>
        </TeamPageOption>
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
