import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DropDown from '../../commons/DropDown';
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
import { BoardProps } from '../../../types/TeamPageType';
import { Button } from '../../../styles/styled-components/CommonStyle';
import { useSelector } from 'react-redux';
import { isLogInSelector } from '../../../redux/modules/auth/authSelectors';
import MyPagination from '../../myPage/MyPagination';
import EmptyBox from '../../commons/EmptyBox';
import CheckPositionStatus from './CheckPostionStatus';

function TeamList(props: BoardProps) {
  const navigate = useNavigate();
  const isLogin = useSelector(isLogInSelector);
  const {
    dropdownList,
    handleReset,
    filteredData,
    currentPage,
    setCurrentPage,
    currentData,
    totalPage,
  } = props;

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
          {dropdownList.map((list, idx) => (
            <DropDown
              key={idx}
              list={list.option}
              selected={list.state}
              setSelected={list.setState}
            />
          ))}
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
                    <Author>모집자: {item.author}</Author>
                  </ContentHeader>
                  <ContentTitle>
                    <span>{item.area}</span>
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
