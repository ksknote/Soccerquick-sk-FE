import styled from 'styled-components';

// Page 부분
export const AdminContainer = styled.div`
  margin-top: 5rem;
  font-size: 3rem;
  height: 82vh;
`;

export const BodyContainer = styled.div`
  height: fit-content;
`;

export const BodyLeftBar = styled.div`
  display: flex;
  float: left;
  width: 25rem;
  height: 75rem;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #bbb;
  /* background-color: yellowgreen; */
`;

export const BodyMain = styled.div`
  background-color: rgb(245, 245, 245);
  width: 159rem;
  height: 100rem;
`;

export const MainButton = styled.button<{ state: string }>`
  margin: 3rem 2rem 0rem 2rem;
  border: 1px solid;
  ${(props) =>
    props.state === 'true' &&
    `
    background-color: lightgray;
  `}
  &:hover {
    transform: scale(1.1);
  }

  &:active {
    background-color: darkgray;
  }
`;

export const UserButton = styled.button<{ state: string }>`
  margin: 3rem 2rem 0rem 2rem;
  border: 1px solid;
  ${(props) =>
    props.state === 'true' &&
    `
    background-color: lightgray;
  `}
  &:hover {
    transform: scale(1.1);
  }

  &:active {
    background-color: darkgray;
  }
`;

// Component부분

export const UserManageContainer = styled.div`
  padding-top: 2rem;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  width: 70%;
`;
export const UserManageContainerTable = styled.div`
  text-align: center;
  display: grid;
  margin-top: 2rem;
  padding-left: 3rem;
  width: 105rem;
  font-size: 2rem;
  table {
    width: 100%;
    border-collapse: collapse;
  }
  tr {
    border-bottom: 1px solid #000;
    justify-content: space-around;
    align-items: center;
  }
  td {
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

export const StyledTr = styled.tr`
  height: 4rem;
  margin: 1rem 1rem;
  padding: 2rem 1rem;
  font-size: 1.6rem;
  border-bottom: 0.1rem solid #dddddd;
`;

export const StyledButton = styled.button`
  font-size: 1.4rem;
  border-radius: 1rem;
`;

export const PageSelect = styled.div`
  clear: both;
  margin: 1.7rem 0rem;
  padding: 1rem 0rem;
  justify-content: center;
  display: flex;
  border-top: 1px solid #ddd;
  background-color: rgb(245, 245, 245);
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
  background-color: rgb(245, 245, 245);
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

// Component-Modal 부분

export const TeamPageBody = styled.div`
  /* display: flex; */
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  font-size: 1.8rem;
  table {
    width: 100%;
  }

  tr {
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  td {
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 1px solid;
    padding: 0.4rem;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

export const ModalPage = styled.div`
  position: fixed;
  margin: 2rem;
  padding: 1.2rem 1.3rem 0rem 6rem;
  justify-content: center;
  align-items: center;
  width: 60rem;
  height: 45rem;
  background-color: rgba(255, 255, 255);
  z-index: 999;
`;

export const DetailButtonContainer = styled.div`
  display: flex;
  position: absolute;
  width: 47.6rem;
  justify-content: center;
  z-index: 997;
  /* background-color: beige; */
`;

export const DetailButton = styled.button<{ data: string }>`
  margin: 1rem 2rem;
  padding: 0.4rem 2rem;
  border-radius: 1rem;
`;

export const ManagementButtonContainer = styled.div`
  display: flex;
  position: absolute;
  width: 47.6rem;
  justify-content: center;
  z-index: 997;
`;

export const ManagementButton = styled.button<{ data: string }>`
  margin: 1rem 2rem;
  padding: 0.4rem 2rem;
  border-radius: 1rem;
`;

export const ReturnButton = styled.button`
  margin: 1rem 2rem;
  padding: 0rem 1.4rem;
`;
