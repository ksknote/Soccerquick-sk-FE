import styled from 'styled-components';

// MainPage
export const MainPageBody = styled.div`
  width: 98.5rem;
  min-height: 90rem;
  margin: 0 auto 15rem auto;
`;

// SelectCategory

export const StyledWrapper = styled.div`
  width: 98.4rem;
  border-top: 0.2rem solid #c9c9c97c;
  box-shadow: 0px -5px 5px -5px #c9c9c97c;
`;

export const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 16rem auto;
  width: 70rem;
`;

export const StyledButton = styled.button`
  height: 23rem;
  width: 23rem;
  background: transparent;
  :hover {
    div:first-child {
      filter: drop-shadow(0 0 1rem #93d663);
    }
    div:last-child {
      color: var(--color--green);
    }
  }
`;

export const StyledImg = styled.div`
  height: 23rem;
  width: 23rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  filter: drop-shadow(0 0 0.5rem #d8d3d3);

  img {
    height: 12rem;
    width: 12rem;
  }
`;

export const StyledButtonText = styled.div`
  font-size: 2.4rem;
  font-weight: 500;
  color: #6a6a6a;
  margin-top: 4rem;
  text-align: center;
  width: 23rem;
`;

// FindingMember

export const StyledHeader = styled.div`
  padding: 0 0 3rem 1rem;

  h1 {
    font-size: 3rem;
    margin: 0;
  }
  h3 {
    font-size: 1.9rem;
    font-weight: 500;
    color: #9da7ae;
    margin: 1rem 0 2rem 0;
  }
`;

// FindingMemberPageBoard

export const Teampage = styled.div`
  display: flex;
  width: 98.4rem;
  justify-content: space-between;
  font-size: 1.7rem;
`;

export const StyledTotalNumber = styled.p`
  display: flex;
  align-items: center;
  padding-left: 1rem;
  font-size: 1.8rem;
  color: #5e5d5d;
`;

export const TeamPageBody = styled.div`
  justify-content: space-between;
  height: 70rem;
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
  display: flex;
  margin: 10px 0;
`;

export const StyledResetButton = styled.button`
  background-color: #fff;
  display: flex;
  justify-content: space-between;

  align-items: center;
  color: #333;
  padding: 0 1.8rem;

  border: 1px solid #ddd;
  border-radius: 1rem;
  font-size: 1.6rem;
  img {
    width: 2.4rem;
    margin-right: 0.5rem;
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

export const StyledWriteButton = styled.button`
  width: 13rem;
  height: 5rem;
  border-radius: 0.8rem;
  background-color: var(--color--green);
  color: white;
  font-size: 1.7rem;
  font-weight: 600;
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
