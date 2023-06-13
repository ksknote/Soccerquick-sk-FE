import react, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReviewPost } from './SearchMyReviewPost';
import { GroupPost } from './SearchMyTeamPost';
import { MyApplicationGroupPost } from './SearchMyApplicationPost';
import MyPagination from '../MyPagination';

type MyPostTableProps = {
  title?: string;
  properties?: string[];
  reviewData?: Array<ReviewPost>;
  groupData?: Array<GroupPost>;
  applyTeamData?: Array<MyApplicationGroupPost>;
};

function MyPostTable({
  title,
  properties,
  reviewData,
  groupData,
  applyTeamData,
}: MyPostTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const totalItemsCount =
    (reviewData && reviewData.length) ||
    (groupData && groupData.length) ||
    (applyTeamData && applyTeamData.length);

  // get current data
  const lastIndexOfData = currentPage * itemsPerPage;
  const firstIndexOfData = lastIndexOfData - itemsPerPage;
  const currentReviewData =
    reviewData && reviewData.slice(firstIndexOfData, lastIndexOfData);
  const currentGroupData =
    groupData && groupData.slice(firstIndexOfData, lastIndexOfData);
  const currentApplyTeamData =
    applyTeamData && applyTeamData.slice(firstIndexOfData, lastIndexOfData);

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
            {''}
            {properties && properties.map((property) => <th>{property}</th>)}
            <th></th>
          </StyledTitleTr>
        </thead>
        <tbody>
          {currentGroupData?.map((item: GroupPost, idx: number) => {
            return (
              <StyledItemTr key={`review-${idx}`}>
                <td>{item.leader_name}</td>
                <td>
                  <StyledLongSpan>{item.title}</StyledLongSpan>
                  <span style={{ color: 'red' }}>
                    [{item.applicant.length}]
                  </span>
                </td>
                <td>{item.location}</td>
                <td>{item.status}</td>
                <td
                  style={{ color: 'blue' }}
                >{`${item.player_current_count}/${item.player_count}`}</td>
                <td
                  style={{ color: 'red' }}
                >{`${item.gk_current_count}/${item.gk_count}`}</td>
                <td>
                  <StyledButton
                    onClick={() => {
                      navigate(`/teampage/team/${item.group_id}`);
                    }}
                  >
                    조회
                  </StyledButton>
                </td>
              </StyledItemTr>
            );
          })}
          {currentApplyTeamData?.map((item, idx) => {
            return (
              <StyledItemTr key={`review-${idx}`}>
                <td>{item.leader_name}</td>
                <td>
                  <StyledLongSpan>{item.title}</StyledLongSpan>
                  <span style={{ color: 'red' }}>
                    [{item.applicant?.length}]
                  </span>
                </td>
                <td>{item.location}</td>
                <td>{item.status}</td>
                <td
                  style={{ color: 'blue' }}
                >{`${item.player_current_count}/${item.player_count}`}</td>
                <td
                  style={{ color: 'red' }}
                >{`${item.gk_current_count}/${item.gk_count}`}</td>
                <td>
                  <StyledButton
                    onClick={() => {
                      navigate(`/teampage/team/${item.group_id}`);
                    }}
                  >
                    조회
                  </StyledButton>
                </td>
              </StyledItemTr>
            );
          })}
          {currentReviewData?.map((item, idx) => {
            return (
              <StyledItemTr key={`review-${idx}`}>
                <td>{item.name}</td>
                <td>
                  {' '}
                  <StyledLongSpan>{item.comment}</StyledLongSpan>
                </td>
                <td>{item.dom_id}</td>
                <td style={{ fontWeight: 'bold' }}>{item.rating}</td>
                <td>{item.userslikes.length}</td>
                <td>
                  <StyledButton
                    onClick={() => {
                      navigate(`/review/detail/${item.review_id}`);
                    }}
                  >
                    조회
                  </StyledButton>
                </td>
              </StyledItemTr>
            );
          })}
        </tbody>
      </table>
      <MyPagination
        totalItemsCount={totalItemsCount ? totalItemsCount : 100}
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
    padding-left: 1rem;
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

  & > td {
    flex: 2;
    text-align: center;
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
`;
