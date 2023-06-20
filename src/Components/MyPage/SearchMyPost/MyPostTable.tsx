import react, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MyPagination from '../MyPagination';

type MyPostTableProps = {
  title?: string;
  properties?: string[];
  data?: Array<string[] | null>;
};

function MyPostTable({ title, properties, data }: MyPostTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const totalItemsCount = data ? data?.length : 0;

  // get current data
  const lastIndexOfData = currentPage * itemsPerPage;
  const firstIndexOfData = lastIndexOfData - itemsPerPage;
  const currentData = data?.slice(firstIndexOfData, lastIndexOfData);

  const navigate = useNavigate();

  return (
    <TableContainer>
      <StyledTitleDiv>
        {title}
        <span> ( 총 {totalItemsCount} )</span>
      </StyledTitleDiv>
      <table>
        <thead>
          <StyledTitleTr key={title}>
            {properties &&
              properties.map((property, idx) => <th key={idx}>{property}</th>)}
            <th></th>
          </StyledTitleTr>
        </thead>
        <tbody>
          {currentData && currentData?.length > 0 ? (
            currentData.map((item, idx) => {
              return (
                <StyledItemTr key={`data-${idx}`}>
                  {item &&
                    item.map((value, index) => {
                      if (index === 0) {
                        return null;
                      } else if (index === 2) {
                        return (
                          <td key={`td-${idx}`}>
                            <StyledLongSpan>{value}</StyledLongSpan>
                            <span style={{ color: 'red' }}>{item[3]}</span>
                          </td>
                        );
                      } else if (index === 3) {
                        return null;
                      } else if (index === item.length - 1) {
                        return item[0] === 'teamPage' ? (
                          <td key={`item-${index}`}>
                            <StyledButton
                              onClick={() => {
                                navigate(`/teampage/team/${value}`);
                              }}
                            >
                              조회
                            </StyledButton>
                          </td>
                        ) : (
                          <td key={`item-${index}`}>
                            <StyledButton
                              onClick={() => {
                                navigate(`/ground/${value}`);
                              }}
                            >
                              조회
                            </StyledButton>
                          </td>
                        );
                      } else {
                        return <td key={`item-${index}`}>{value}</td>;
                      }
                    })}
                </StyledItemTr>
              );
            })
          ) : (
            <StyledNoItemTr>
              <td>{'조회된 글이 없습니다.'}</td>
            </StyledNoItemTr>
          )}
        </tbody>
      </table>
      <MyPagination
        totalItemsCount={totalItemsCount ? totalItemsCount : 1}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </TableContainer>
  );
}

export default MyPostTable;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  & > table {
    width: 100%;
    height: 39rem;
    background-color: #fdfdfd;
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

const StyledTitleTr = styled.tr`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 5rem;
  background-color: #fafafa;
  padding: 0 3rem;
  font-size: 1.5rem;

  & > th {
    flex: 2;
  }

  & > th:nth-child(2) {
    flex: 4;
    text-align: start;
  }

  & > th:first-child {
    flex: 2;
    text-align: start;
  }
`;

const StyledItemTr = styled.tr`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 8rem;
  border-bottom: 1px solid rgb(238, 238, 238);
  padding: 0 3rem;
  background-color: #fff;

  & > td {
    flex: 2;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 25rem;
  }

  & > td:nth-child(2) {
    flex: 4;
    text-align: start;
  }

  & > td:first-child {
    flex: 2;
    text-align: start;
  }
`;

const StyledLongSpan = styled.span`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 20rem;
  margin-right: 1rem;
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
`;

const StyledNoItemTr = styled.tr`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #fff;
`;
