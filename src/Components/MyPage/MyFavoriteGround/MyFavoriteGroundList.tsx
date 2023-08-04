import react, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import checkIcon from '../../../styles/icon/check.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  isLogInSelector,
  userSelector,
} from '../../../ReduxStore/modules/Auth/authSelectors';
import { DomDataType } from '../../../Pages/SearchPage';
import { ProvidedElementList } from '../../SearchPage/Contents/SearchData';
import MyPagination from '../MyPagination';
import MobileHeader from '../../MobileHeader';
import chevronIcon from '../../../styles/icon/chevron_grey.svg';

type MyFavoriteGroundListProps = {
  favoritePlaygrounds: Array<string>;
};

function MyFavoriteGroundList({
  favoritePlaygrounds,
}: MyFavoriteGroundListProps) {
  const isLogIn = useSelector(isLogInSelector);
  const [filteredData, setFilteredData] = useState<DomDataType[]>([]);

  // pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const totalItemsCount = filteredData.length;
  const lastIndexOfData = currentPage * itemsPerPage;
  const firstIndexOfData = lastIndexOfData - itemsPerPage;
  const currentData = filteredData.slice(firstIndexOfData, lastIndexOfData);

  useEffect(() => {
    if (isLogIn) {
      getDomData();
    }
  }, [isLogIn]);

  const getDomData = async () => {
    const domarray: Array<DomDataType> = [];
    for (let i = 0; i < favoritePlaygrounds.length; i++) {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/doms/${favoritePlaygrounds[i]}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (!domarray.includes(res.data.data)) {
            domarray.push(res.data.data);
          }
        })
        .catch((err) => console.log(err));
    }
    setFilteredData(domarray);
  };

  const navigate = useNavigate();

  return (
    <Wrapper>
      <MobileHeader title="즐겨찾는 경기장" />
      <Searchpage>
        <SearchPageBody>
          <StyledTitleDiv>
            즐겨찾는 경기장
            <span> ( 총 {totalItemsCount} 건 )</span>
          </StyledTitleDiv>
          <StyledTableContainer>
            <StyledThead>
              <StyledLabelTr>
                <th>지역</th>
                <th>경기장</th>
                <th>상세조회</th>
              </StyledLabelTr>
            </StyledThead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item, idx) => (
                  <StyledTr key={item.title + idx}>
                    <StyledAddressTd>{item.address.area}</StyledAddressTd>
                    <StyledMainTd>
                      <StyledAddress>{item.address.area}</StyledAddress>

                      <p>{item.title}</p>
                      <StyledTableCell>
                        {Object.keys(ProvidedElementList).map(
                          (provided) =>
                            item[provided] && (
                              <StyledTable key={provided} data={provided}>
                                {ProvidedElementList[provided]}
                              </StyledTable>
                            )
                        )}
                      </StyledTableCell>
                    </StyledMainTd>

                    <td align="center" valign="middle">
                      <StyledButton
                        onClick={() => {
                          navigate(`/ground/${item.dom_id}`);
                        }}
                      >
                        조회
                      </StyledButton>
                    </td>
                  </StyledTr>
                ))
              ) : (
                <StyledTr>
                  {/* <td></td> */}
                  <StyledMessageTd>즐겨찾는 구장이 없습니다</StyledMessageTd>
                  {/* <td></td> */}
                </StyledTr>
              )}
            </tbody>
          </StyledTableContainer>
        </SearchPageBody>
        <MyPagination
          totalItemsCount={totalItemsCount ? totalItemsCount : 1}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </Searchpage>
    </Wrapper>
  );
}

export default MyFavoriteGroundList;

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

const Wrapper = styled.div`
  width: 100%;
  max-width: 120rem;
  min-height: 100vh;
  height: 100%;
  @media (max-width: 768px) {
    margin: 0 auto 8rem auto;
  }
`;

const Searchpage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  font-size: 1.7rem;
  padding: 0 3rem 1rem 3rem;
  @media (min-width: 768px) {
    margin: 2rem auto;
  }
`;

const SearchPageBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;
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

const StyledTitleDiv = styled.div`
  display: flex;
  width: 90%;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;

  > span {
    padding-left: 1rem;
    align-self: flex-end;
    font-size: 1.5rem;
    line-height: 3rem;
    color: grey;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledTableContainer = styled.table`
  margin: 2rem 0;
`;

const StyledThead = styled.thead`
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLabelTr = styled.tr`
  height: 5rem;
  padding-bottom: 1rem;
  background-color: #fafafa;
  border-bottom: 1px solid #d5d5d5ae;
  box-shadow: 0px 5px 5px -5px #cbc9c9d5;
  th {
    font-size: 1.5rem;
    font-weight: 500;
    :nth-child(2) {
      text-align: start;
      padding-left: 4.5rem;
    }
    :nth-child(4) {
      padding-right: 5rem;
    }
  }
  @media (min-width: 1024px) {
    font-size: 1.8rem;
  }
`;

const StyledTableCell = styled.div`
  display: inline-block;
  height: 3rem;
  padding: 0;
  padding-top: 0.5rem;
  border-radius: 0.4rem;
  font-size: 1.5rem;
  font-weight: 400;
  color: #888888;
  line-height: 3rem;
  overflow: hidden;

  @media (min-width: 1024px) {
    padding: 0;
    margin: 1.2rem 1rem 0rem 0;
  }
`;

const StyledTable = styled.div<{ data: string }>`
  display: inline;
  height: 4rem;
  padding: 0.1rem 1rem 0.1rem 1rem;
  margin-right: 0.5rem;
  border: 0.1rem solid #eeeeee;
  border-radius: 2rem;
  font-size: 1.1rem;
  font-weight: 400;
  color: ${({ data }) => getColorBydata(data)};
  background-color: ${({ data }) => getBackgroundColorBydata(data)};
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (min-width: 1024px) {
    font-size: 1.4rem;
    margin-right: 1.2rem;
  }
`;

const StyledTr = styled.tr`
  height: 11rem;
  margin: 1rem 1rem;
  padding: 2rem 1rem;
  font-size: 1.6rem;
  border-bottom: 0.1rem solid #dddddd;
  background-color: #fff;
  @media (min-width: 1024px) {
    height: 12rem;
  }
`;

const StyledAddressTd = styled.td`
  display: none;
  @media (min-width: 768px) {
    display: table-cell;
    font-size: 1.4rem;
    font-weight: 500;
    text-align: center;
    padding-left: 1rem;
  }
  @media (min-width: 1024px) {
    font-size: 1.6rem;
  }
`;

const StyledMainTd = styled.td`
  max-width: 48rem;
  font-size: 1.6rem;
  p {
    cursor: pointer;
  }
  @media (min-width: 768px) {
    padding-left: 4rem;
    max-width: 48rem;
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
  width: 7rem;
  height: 3.8rem;
  border-radius: 0.7rem;
  background-color: var(--color--green);
  color: white;
  font-size: 1.4rem;
  font-weight: 500;

  &:hover {
    background-color: #1bbd1b;
  }
  @media (min-width: 768px) {
    width: 10rem;
    height: 3.8rem;
  }
`;

const StyledMessageTd = styled.td`
  text-align: center;
`;
