import styled from 'styled-components';

export const MyTeamPostWrapper = styled.div`
  @media (max-width: 768px) {
    padding: 2rem 1rem 0 1rem;
  }
`;

// FindingMember

export const StyledHeader = styled.div`
  padding-left: 1rem;
  h1 {
    font-size: 2rem;
    margin: 0;
    @media (min-width: 1024px) {
      font-size: 3rem;
    }
  }
  h3 {
    font-size: 1.4rem;
    font-weight: 500;
    color: #9da7ae;
    margin: 1rem 0 2rem 0;
    @media (min-width: 1024px) {
      font-size: 1.8rem;
      margin: 1rem 0 3rem 0;
    }
  }
`;

// FindingMemberPageBoard

export const Teampage = styled.div`
  display: flex;
  max-width: 120rem;
  justify-content: space-between;
  font-size: 1.7rem;
`;

export const StyledTotalNumber = styled.p`
  font-size: 1.5rem;
  color: #5e5d5d;
  @media (min-width: 1024px) {
    font-size: 1.8rem;
  }
`;

export const TeamPageBody = styled.div`
  justify-content: space-between;
  width: 100%;
  table {
    width: 100%;
  }

  td {
    font-size: 1.7rem;
    justify-content: center;
    align-items: center;
    text-align: center;
    :first-child {
      text-align: start;
      padding-left: 2rem;
    }
    :nth-child(2) {
      text-align: start;
    }
  }
`;

export const StyledLabelTr = styled.tr`
  justify-content: space-between;
  align-items: center;
  height: 6rem;
  padding-bottom: 1rem;
  background-color: #fafafa;
  border-bottom: 1px solid #d5d5d5ae;
  box-shadow: 0px 5px 5px -5px #cbc9c9d5;
  th {
    font-size: 1.8rem;
    font-weight: 500;
  }
`;

export const TeamPageOption = styled.div`
  width: 100%;
  display: flex;
  margin: 10px 0;
`;

export const StyledResetButton = styled.button`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 1rem;
  font-size: 1.6rem;
  @media (min-width: 1024px) {
    padding: 0 1.8rem;
  }

  img {
    width: 2rem;
    @media (min-width: 1024px) {
      width: 2.4rem;
      margin-right: 0.5rem;
    }
  }
  p {
    display: none;
    @media (min-width: 1024px) {
      display: inline-block;
    }
  }
`;

export const StyledTr = styled.tr`
  height: 8rem;
  margin: 1rem 1rem;
  padding: 2rem 1rem;
  font-size: 1.6rem;

  border-bottom: 0.1rem solid #dddddd;
`;

export const StyledTitle = styled.p`
  max-width: 30rem;
  font-size: 1.8rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  &:hover {
    transform: scale(1.1);
    color: #8b8b8b;
    text-decoration: underline;
  }
`;

export const StyledPositionTd = styled.td`
  div {
    width: 17rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      font-weight: 500;
      color: #727272;
      /* background-color: #fafafa; */
      :first-child {
        margin-bottom: 0.4rem;
        span {
          color: #2f7fe8;
        }
        :before {
          content: '• ';
          color: #2f7fe8;
        }
      }
      :last-child {
        span {
          color: #e8452f;
        }
        :before {
          content: '• ';
          color: #e8452f;
        }
      }
    }
  }
`;

export const StyledStatusTd = styled.div<{ status: string }>`
  height: 3rem;
  width: 9rem;
  padding: 0.2rem 1rem 0.3rem 1rem;
  margin: auto;
  border: 0.1rem solid #eeeeee;
  border-radius: 0.7rem;
  font-size: 1.6rem;
  font-weight: 400;

  color: ${({ status }) => (status === '모집중' ? 'green' : 'gray')};
  background-color: ${({ status }) =>
    status === '모집중' ? '#e6ffeb' : '#eeeeee'};
`;

export const TeamPageFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  width: fit-content;
  margin-top: 3rem;
  margin-right: 3rem;
  float: right;
`;

export const PageSelect = styled.div`
  clear: both;
  margin-top: 9rem;
  justify-content: center;
  display: flex;
  font-size: 1.8rem;
`;

export const PageButton = styled.button<{
  selected: number;
  currentPage: number;
}>`
  border: none;
  margin: 0;
  padding: 0.2rem;
  text-decoration: none;
  font-size: 1.9rem;
  color: ${(props) =>
    props.selected === props.currentPage ? 'blue' : 'black'};
  background-color: white;
  font-weight: ${(props) =>
    props.selected === props.currentPage ? 'bold' : 'normal'};

  &:hover {
    text-decoration: underline;
    color: gray;
  }

  &.selected {
    font-weight: bold;
  }
`;

//TeamList

export const OptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TeamRecruitContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-row-gap: 2rem;
  grid-column-gap: 3rem;
  margin-top: 1.5rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 3rem;
  }
`;

export const TeamRecruitLi = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 16rem;
  box-sizing: border-box;
  padding: 1.5rem;
  gap: 1.5rem;
  background: white;
  filter: drop-shadow(rgb(211, 211, 211) 0px 0px 0.3rem);
  border-radius: 2rem;
  font-size: 1.3rem;
  cursor: pointer;
  @media (min-width: 1024px) {
    min-height: 17rem;
    font-size: 1.5rem;
  }
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Status = styled.span`
  width: fit-content;
  padding: 0.2rem 1rem 0.3rem 1rem;
  border: 0.1rem solid #eeeeee;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 500;
  @media (min-width: 1024px) {
    font-size: 1.4rem;
  }
`;
export const RecruitStatus = styled(Status)<{ status: string }>`
  color: ${({ status }) => (status === '모집중' ? 'green' : 'gray')};
  background-color: ${({ status }) =>
    status === '모집중' ? '#e6ffeb' : '#eeeeee'};
`;

export const ContentTitle = styled.div`
  display: flex;
  font-size: 1.6rem;
  span {
    color: #6e6e6e;
    font-weight: 500;
    white-space: nowrap;
    :after {
      content: '|';
      font-weight: 300;
      color: #b1b1b1;
      margin: 0 0.5rem;
    }
  }
  @media (min-width: 1024px) {
    font-size: 1.8rem;
  }
`;

export const Position = styled.div`
  p {
    width: fit-content;
    padding: 0.1rem 0.5rem;
    /* border: 0.1rem solid #eeeeee;
    border-radius: 0.7rem; */
    font-weight: 400;
    color: #3f3f3f;
    :first-child {
      margin-bottom: 0.2rem;
      :before {
        content: '|';
        color: #2f7fe8;
        font-weight: 800;
        margin-right: 0.5rem;
      }
      span {
        color: #2f7fe8;
      }
    }
    :last-child {
      :before {
        content: '|';
        color: #e8452f;
        font-weight: 800;
        margin-right: 0.5rem;
      }
      span {
        color: #e8452f;
      }
    }
  }
`;

export const Author = styled.div`
  color: #616161;
`;

export const BodyContainer = styled.div`
  padding: 1rem;
`;

export const TeamMemberList = styled.button`
  height: 4rem;
  background: white;
  border: 0.13rem solid var(--color--green);
  border-radius: 0.5rem;
  font-size: 1.3rem;
  font-weight: 500;
  color: green;
  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

//SearchMyApplicationPost

export const StatusContainer = styled.div`
  span:first-child {
    margin-right: 0.5rem;
  }
`;
export const AcceptStatus = styled(Status)<{ status: number }>`
  color: ${({ status }) => (status === 1 ? 'green' : 'gray')};
  background-color: white;
`;

export const AcceptedDespcription = styled.div`
  background: #f6f6f6;
  font-size: 1.1rem;
  color: #403a3a;
  padding: 1rem;
  border-radius: 1rem;
  span {
    color: green;
    text-decoration: underline;
  }
  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;
