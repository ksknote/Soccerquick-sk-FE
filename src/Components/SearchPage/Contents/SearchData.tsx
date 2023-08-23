import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchFilter from './SearchFilter';
import GroundListSkeleton from './groundListSkeleton';
import MyPagination from '../../MyPage/MyPagination';
import checkIcon from '../../../styles/icon/check.svg';
import { DomDataType } from '../../../Pages/SearchPage';
import alertModal from '../../Commons/alertModal';
import { Cell } from '../../../styles/Common/CommonStyle';
// import { checkHandler } from './GroundComparison';

type FindingGroundProps = {
  checkedArray: DomDataType[];
  setCheckedArray: React.Dispatch<React.SetStateAction<DomDataType[]>>;
  setCheckedInModal: React.Dispatch<React.SetStateAction<string[]>>;
  sortedDomData: DomDataType[];
  setSortedDomData: React.Dispatch<React.SetStateAction<DomDataType[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type ProvidedElementListType = {
  [key: string]: string;
};

interface ItemType {
  key: string;
  value: string;
  selected: boolean;
}

export const ProvidedElementList: ProvidedElementListType = {
  parking: '주차 가능',
  parking_free: '무료 주차',
  bibs: '조끼 대여',
  beverage: '음료 구비',
  ball: '공 대여',
  shower: '샤워실',
  shoes: '풋살화 대여',
  toilet: '남녀 구분 화장실',
};

// SoccerQuick/Frontend/src/Pages/SearchPage.tsx 75번째 줄에서 연결됨
function FindingGround(props: FindingGroundProps) {
  const navigate = useNavigate();
  const checkedArray = props.checkedArray;
  const setCheckedArray = props.setCheckedArray;
  const setCheckedInModal = props.setCheckedInModal;
  const sortedDomData = props.sortedDomData;
  const isLoading = props.isLoading;
  const setIsLoading = props.setIsLoading;

  // Left Bar에서 설정한 필터링 옵션이 담기는 상태.
  // SoccerQuick/Frontend/src/Components/SearchPage/Contents/SearchFilter.tsx Line12의 useEffect로 정의됨
  const [filterOption, setFilterOption] = useState<ItemType[]>([]);

  // 정렬 조건이 변할 때 페이지에 보여줄 데이터를 필터링 하는 부분
  const [filteredData, setFilteredData] =
    useState<DomDataType[]>(sortedDomData);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItemsCount = filteredData.length;
  const lastIndexOfData = currentPage * itemsPerPage;
  const firstIndexOfData = lastIndexOfData - itemsPerPage;
  const currentData = isMobile
    ? filteredData
    : filteredData.slice(firstIndexOfData, lastIndexOfData);

  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: DomDataType
  ) => {
    if (e.target.checked) {
      if (checkedArray.length >= 5) {
        setCheckedArray((prev) =>
          prev.filter((item) => item.title !== value.title)
        );
        alertModal('구장 비교는 최대 5개까지 가능합니다.', 'warning');
      } else {
        setCheckedArray((prev) => [...prev, value]);
        setCheckedInModal((prev) => [...prev, value.title]);
      }
    } else {
      setCheckedArray((prev) =>
        prev.filter((item) => item.title !== value.title)
      );
      setCheckedInModal((prev) => prev.filter((item) => item !== value.title));
    }
  };

  // 이곳에 필터링 함수 작성
  useEffect(() => {
    // 필터링 옵션의 각 필터옵션에 대하여
    if (filterOption.length === 0) {
      setFilteredData(sortedDomData);
    } else {
      const filteredDomdata = sortedDomData.filter((data) => {
        for (let option of filterOption) {
          if (!data[option.key]) {
            return false;
          }
        }
        return true;
      });
      setFilteredData(filteredDomdata);
    }
  }, [filterOption, sortedDomData]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  const clickDomHandler = (domId: string) => {
    navigate(`/ground/${domId}`);
  };

  return (
    <SearchContainer style={{ width: '100%' }}>
      <SearchFilter setFilterOption={setFilterOption} />
      <Searchpage>
        <SearchPageBody>
          <table>
            <StyledThead>
              <StyledLabelTr>
                {!isLoading ? (
                  <>
                    <th></th>
                    <th>지역</th>
                    <th>경기장</th>
                    <th>상세조회</th>
                  </>
                ) : (
                  <></>
                )}
              </StyledLabelTr>
            </StyledThead>

            {!isLoading ? (
              <tbody>
                {currentData.map((item, idx) => (
                  <StyledTr key={item.title + idx}>
                    <StyledCheckboxTd>
                      <input
                        type="checkbox"
                        id={item.title}
                        checked={checkedArray.some(
                          (data) => data.title === item.title
                        )}
                        onChange={(e) => checkHandler(e, item)}
                      />
                      <label htmlFor={item.title}></label>
                    </StyledCheckboxTd>
                    <StyledAddressTd>{item.address.area}</StyledAddressTd>
                    <StyledMainTd>
                      <StyledAddress>{item.address.area}</StyledAddress>
                      <p onClick={(e) => clickDomHandler(item.dom_id)}>
                        {item.title}
                      </p>
                      <StyledCellContainer>
                        {Object.keys(ProvidedElementList).map(
                          (provided) =>
                            item[provided] && (
                              <StyledFieldCell key={provided} data={provided}>
                                {ProvidedElementList[provided]}
                              </StyledFieldCell>
                            )
                        )}
                      </StyledCellContainer>
                    </StyledMainTd>

                    <td>
                      <StyledButton
                        onClick={(e) => clickDomHandler(item.dom_id)}
                      >
                        조회
                      </StyledButton>
                    </td>
                  </StyledTr>
                ))}
              </tbody>
            ) : (
              <GroundListSkeleton />
            )}
          </table>
          <div style={{ height: '100%', width: '100%' }}> </div>
        </SearchPageBody>
        {isMobile || (
          <MyPagination
            totalItemsCount={totalItemsCount ? totalItemsCount : 100}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </Searchpage>
    </SearchContainer>
  );
}

export default FindingGround;

const SearchContainer = styled.div`
  position: relative;
  min-height: 55rem;
  @media (max-width: 768px) {
    position: absolute;
  }
`;

const Searchpage = styled.div`
  display: flex;
  font-size: 1.7rem;
  margin: 0 auto 7rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SearchPageBody = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 100rem;
  margin-bottom: 3rem;
  flex-direction: column;
  table {
    width: 100%;
  }
  tr {
    justify-content: space-between;
    align-items: center;
  }
  td {
    justify-content: center;
    align-items: center;
  }
`;

const StyledThead = styled.thead`
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLabelTr = styled.tr`
  height: 6rem;
  padding-bottom: 1rem;
  background-color: #fafafa;
  border-bottom: 1px solid #d5d5d5ae;
  box-shadow: 0px 5px 5px -5px #cbc9c9d5;
  font-size: 1.5rem;
  th {
    :last-child {
      padding-right: 2rem;
    }
    :nth-child(2) {
      text-align: start;
      padding-left: 4.5rem;
    }
  }
  @media (min-width: 1024px) {
    font-size: 1.8rem;
  }
`;

const StyledCellContainer = styled.div`
  display: inline-block;
  height: 3rem;
  padding-top: 0.5rem;
  border-radius: 0.4rem;
  font-weight: 400;
  color: #888888;
  line-height: 3rem;
  overflow: hidden;
  @media (min-width: 1024px) {
    padding: 0;
    margin: 1.2rem 1rem 0rem 0;
  }
`;

const StyledFieldCell = styled(Cell)<{ data: string }>`
  color: ${({ data }) => getColorBydata(data)};
  background-color: ${({ data }) => getBackgroundColorBydata(data)};
  @media (min-width: 1024px) {
    font-size: 1.4rem;
    margin-right: 1.2rem;
  }
`;

const StyledTr = styled.tr`
  height: 11rem;
  padding: 2rem 1rem;
  font-size: 1.6rem;
  border-bottom: 0.1rem solid #dddddd;
  @media (min-width: 1024px) {
    height: 10rem;
  }
`;

const StyledCheckboxTd = styled.td`
  padding-left: 3rem;
  input {
    display: none;

    + label {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      border: 0.15rem solid var(--color--darkgreen);
      border-radius: 0.5rem;
      cursor: pointer;
      @media (max-width: 768px) {
        width: 1.6rem;
        height: 1.6rem;
        border: 0.1rem solid var(--color--darkgreen);
        border-radius: 0.3rem;
      }
    }
    :checked + label {
      background-image: url(${checkIcon});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
  @media (max-width: 768px) {
    width: 1rem;
    padding-left: 1.5rem;
  }
`;

const StyledAddressTd = styled.td`
  display: none;
  @media (min-width: 768px) {
    display: table-cell;
    width: 13%;
    font-size: 1.6rem;
    font-weight: 500;
    text-align: center;
    padding-left: 0.2rem;
  }
`;

const StyledMainTd = styled.td`
  width: 100%;
  padding-left: 1.5rem;
  font-size: 1.6rem;
  p {
    cursor: pointer;
  }
  @media (min-width: 768px) {
    padding-left: 1rem;
    width: 69%;
  }
  @media (min-width: 1024px) {
    font-size: 1.8rem;
  }
`;

const StyledAddress = styled.div`
  font-size: 1.3rem;
  color: #696767;
  font-weight: 500;
  padding-bottom: 0.5rem;
  @media (min-width: 768px) {
    display: none;
  }
`;

const StyledButton = styled.button`
  display: none;
  @media (min-width: 768px) {
    display: table-cell;
    width: 10rem;
    height: 3.8rem;
    border-radius: 0.7rem;
    background-color: var(--color--green);
    color: white;
    font-size: 1.4rem;
    font-weight: 500;
    margin-right: 2rem;
  }
`;

const getColorBydata = (data: string) => {
  if (data === 'shoes') {
    return '#531dab';
  } else if (data === 'toilet') {
    return '#096dd9';
  } else if (data === 'ball') {
    return '#d4380d';
  } else if (data === 'bibs') {
    return '#08979c';
  } else if (data === 'parking') {
    return '#c41d7f';
  } else if (data === 'beverage') {
    return '#5e7f0c';
  } else if (data === 'shower') {
    return '#d46b08';
  } else if (data === 'parking_free') {
    return '#c41d7f';
  }
};

const getBackgroundColorBydata = (data: string) => {
  if (data === 'shoes') {
    return '#f9f0ff';
  } else if (data === 'toilet') {
    return '#e6f7ff';
  } else if (data === 'ball') {
    return '#fff2e8';
  } else if (data === 'bibs') {
    return '#e6fffb';
  } else if (data === 'parking') {
    return '#fff0f6';
  } else if (data === 'beverage') {
    return '#f0fff3';
  } else if (data === 'shower') {
    return '#fff7e6';
  } else if (data === 'parking_free') {
    return '#fff7e6';
  }
};
