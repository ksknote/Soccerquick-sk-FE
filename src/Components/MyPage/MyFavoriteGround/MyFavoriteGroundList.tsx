import react, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import checkIcon from '../../../styles/icon/check.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  isLogInSelector,
  userSelector,
} from '../../../store/selectors/authSelectors';
import { DomDataType } from '../../../Pages/SearchPage';
import { ProvidedElementList } from '../../SearchPage/Contents/SearchData';
import MyPagination from '../MyPagination';

function MyFavoriteGroundList() {
  const user = useSelector(userSelector);
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
    const domInfo = await axios
      .get(`${process.env.REACT_APP_API_URL}/doms`, { withCredentials: true })
      .then((res) => res.data.data)
      .catch((err) => console.log(err));

    // const filteredDomInfo = domInfo.reduce(
    //   (acc: Array<DomDataType>, group: DomDataType) => {
    //     const filteredUsersFavorites = group.usersFavorites?.filter(
    //       (type) => type === user?.name
    //     );

    //     if (filteredUsersFavorites && filteredUsersFavorites.length > 0) {
    //       const filteredGroup: DomDataType = {
    //         ...group,
    //         // usersFavorites: filteredUsersFavorites,
    //       };
    //       return [...acc, filteredGroup];
    //     }
    //     return acc;
    //   },
    //   []
    // );
    // setFilteredData(filteredDomInfo);

    setFilteredData(domInfo);
  };

  const navigate = useNavigate();

  return (
    <Searchpage>
      <StyledTitleDiv>
        즐겨찾는 경기장
        <span> ( 총 {totalItemsCount} )</span>
      </StyledTitleDiv>
      <SearchPageBody>
        <table>
          <thead>
            <StyledLabelTr>
              <th></th>
              <th>지역</th>
              <th>경기장</th>
              <th>상세조회</th>
            </StyledLabelTr>
          </thead>
          <tbody>
            {currentData.map((item, idx) => (
              <StyledTr key={item.title + idx}>
                <StyledCheckboxTd>
                  <label htmlFor={item.title}></label>
                </StyledCheckboxTd>
                <StyledAddressTd>{item.address.area}</StyledAddressTd>
                <StyledMainTd>
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

                <td>
                  <StyledButton
                    onClick={() => {
                      navigate(`/ground/${item.dom_id}`);
                    }}
                  >
                    조회
                  </StyledButton>
                </td>
              </StyledTr>
            ))}
          </tbody>
        </table>
      </SearchPageBody>
      <MyPagination
        totalItemsCount={totalItemsCount ? totalItemsCount : 100}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </Searchpage>
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

const Searchpage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.7rem;
  width: 98.4rem;
  margin-top: 2rem;
`;

const SearchPageBody = styled.div`
  display: flex;
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
    font-size: 0.5rem;
    color: grey;
  }
`;

const StyledLabelTr = styled.tr`
  height: 6rem;
  padding-bottom: 1rem;
  background-color: #fafafa;
  border-bottom: 1px solid #d5d5d5ae;
  box-shadow: 0px 5px 5px -5px #cbc9c9d5;
  th {
    font-size: 1.8rem;
    font-weight: 500;
    :nth-child(2) {
      text-align: start;
      padding-left: 4.5rem;
    }
    :nth-child(4) {
      padding-right: 3rem;
    }
  }
`;

const StyledTableCell = styled.div`
  display: inline-block;
  height: 2rem;
  padding: 0;
  margin: 1.2rem 1rem 0rem 0;
  border-radius: 0.4rem;
  font-size: 1.5rem;
  font-weight: 400;
  color: #888888;
  line-height: 2rem;
`;

const StyledTable = styled.div<{ data: string }>`
  display: inline;
  height: 4rem;
  padding: 0.2rem 1rem 0.3rem 1rem;
  margin-right: 1.2rem;
  border: 0.1rem solid #eeeeee;
  border-radius: 2rem;
  font-size: 1rem;
  font-weight: 400;
  color: ${({ data }) => getColorBydata(data)};
  background-color: ${({ data }) => getBackgroundColorBydata(data)};
`;

const StyledTr = styled.tr`
  height: 10rem;
  margin: 1rem 1rem;
  padding: 2rem 1rem;
  font-size: 1.6rem;
  border-bottom: 0.1rem solid #dddddd;
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
    }
    :checked + label {
      background-image: url(${checkIcon});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
`;

const StyledAddressTd = styled.td`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  padding-left: 1rem;
`;

const StyledMainTd = styled.td`
  padding-left: 5rem;
  p {
    font-size: 1.9rem;
  }
`;

const StyledButton = styled.button`
  width: 10rem;
  height: 3.8rem;
  border-radius: 0.7rem;
  background-color: var(--color--green);
  color: white;
  font-size: 1.4rem;
  font-weight: 500;
  margin-right: 3rem;
`;
