import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DropDown from '../../../Components/Commons/DropDown';
import resetIcon from '../../../styles/icon/reset_black.svg';
import styled from 'styled-components';
import {
  StyledTotalNumber,
  TeamPageBody,
  TeamPageOption,
  StyledResetButton,
  StyledWriteButton,
  OptionContainer,
  TeamRecruitContainer,
  TeamRecruitLi,
  ContentHeader,
  Status,
  ContentTitle,
  Position,
  Author,
} from '../Styles/ViewsStyle';
import { BoardProps } from '../../../Types/TeamPageType';
import { useSelector } from 'react-redux';
import { isLogInSelector } from '../../../ReduxStore/modules/Auth/authSelectors';
import MyPagination from '../../../Components/MyPage/MyPagination';

// 포지션 체크하는 부분
export const checkPosition = (
  gk: number,
  gkNeed: number,
  player: number,
  playerNeed: number
) => {
  if (gk < gkNeed) {
    if (player < playerNeed) {
      return (
        <div>
          <p>
            필드플레이어&nbsp;
            <span>
              ({player}/{playerNeed})
            </span>
          </p>
          <p>
            골키퍼&nbsp;
            <span>
              ({gk}/{gkNeed})
            </span>
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <p>
            골키퍼&nbsp;
            <span>
              ({gk}/{gkNeed})
            </span>
          </p>
        </div>
      );
    }
  } else if (player < playerNeed) {
    return (
      <div>
        <p>
          필드플레이어&nbsp;
          <span>
            ({player}/{playerNeed})
          </span>
        </p>
      </div>
    );
  } else return <div>-</div>;
};

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
        <StyledWriteButton
          onClick={() => {
            navigate('/teampage/submit');
          }}
        >
          글 작성하기
        </StyledWriteButton>
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
              <Link to={`./${item.group_id}`} state={{ data: item }}>
                <TeamRecruitLi>
                  <ContentHeader>
                    <Status status={item.status}>{item.status}</Status>
                    <Author>모집자: {item.author}</Author>
                  </ContentHeader>
                  <ContentTitle>
                    <span>{item.area}</span>
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
            ))
          ) : (
            <div>검색결과가 없습니다.</div>
          )}
        </TeamRecruitContainer>
      </TeamPageBody>
    </div>
  );
}

export default TeamList;
