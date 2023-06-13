import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DropDown from '../../../Components/Commons/DropDown';
import resetIcon from '../../../styles/icon/reset_black.svg';
import {
  Teampage,
  StyledTotalNumber,
  TeamPageBody,
  StyledLabelTr,
  TeamPageOption,
  StyledResetButton,
  StyledTr,
  StyledTitle,
  StyledPositionTd,
  StyledStatusTd,
  TeamPageFooter,
  StyledWriteButton,
  PageSelect,
  PageButton,
} from '../Styles/ViewsStyle';
import { BoardProps } from '../../../Types/TeamPageType';
import { useSelector } from 'react-redux';
import { isLogInSelector } from '../../../store/selectors/authSelectors';

function FindinMemberPageBoard(props: BoardProps) {
  const isLogin = useSelector(isLogInSelector);
  const location = useLocation();
  const {
    dropdownList,
    handleReset,
    filteredData,
    currentPage,
    setCurrentPage,
    currentData,
    setCurrentData,
    totalPage,
  } = props;

  React.useEffect(() => {
    setCurrentData(filteredData.slice((currentPage - 1) * 8, currentPage * 8));
  }, [currentPage]);

  // 포지션 체크하는 부분
  const checkPosition = (
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

  return (
    <div style={{ width: '101rem', height: '65vh' }}>
      <Teampage>
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
            초기화
          </StyledResetButton>
        </TeamPageOption>
      </Teampage>
      <Teampage>
        <TeamPageBody>
          <table>
            <thead>
              <StyledLabelTr>
                <th style={{ width: '17%' }}>지역</th>
                <th style={{ width: '35%' }}>제목</th>
                <th style={{ width: '13%' }}>작성자</th>
                <th style={{ width: '21%' }}>모집 포지션/모집 현황</th>
                <th style={{ width: '17%' }}>모집상태</th>
              </StyledLabelTr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                currentData.map((item, idx) => (
                  <StyledTr key={item.group_id}>
                    <td style={{ width: '17%' }}>{item.area}</td>
                    <td style={{ width: '35%' }}>
                      <Link to={`./${item.group_id}`} state={{ data: item }}>
                        <StyledTitle>{item.title}</StyledTitle>
                      </Link>{' '}
                      <span style={{ marginLeft: '0.5rem', color: 'red' }}>
                        {item.applicant &&
                          item.applicant.length > 0 &&
                          `[${item.applicant?.length}]`}
                      </span>
                    </td>
                    <td style={{ width: '13%' }}>{item.author}</td>
                    <StyledPositionTd style={{ width: '21%' }}>
                      {checkPosition(
                        item.gk_current_count,
                        item.gk_count,
                        item.player_current_count,
                        item.player_count
                      )}
                    </StyledPositionTd>
                    <td style={{ width: '17%' }}>
                      <StyledStatusTd status={item.status}>
                        {item.status}
                      </StyledStatusTd>
                    </td>
                  </StyledTr>
                ))
              ) : (
                <tr style={{ height: '52vh' }}>
                  <td colSpan={5}>
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'grey',
                      }}
                    >
                      검색 결과가 없습니다.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TeamPageBody>
      </Teampage>
      <TeamPageFooter>
        {isLogin && (
          <Link
            to="/teampage/submit"
            style={{
              display:
                location.pathname === '/teampage/submit' ? 'none' : 'flex',
            }}
          >
            <StyledWriteButton>글 작성하기</StyledWriteButton>
          </Link>
        )}
      </TeamPageFooter>
      <PageSelect>
        {Array.from({ length: totalPage }, (_, index) => (
          <PageButton
            key={index + 1}
            onClick={() => {
              setCurrentPage(index + 1);
            }}
            selected={index + 1}
            currentPage={currentPage}
          >
            [{index + 1}]
          </PageButton>
        ))}
      </PageSelect>
    </div>
  );
}

export default FindinMemberPageBoard;
