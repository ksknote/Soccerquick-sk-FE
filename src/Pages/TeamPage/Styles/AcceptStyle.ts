import styled from 'styled-components';

export const StyledGridDiv = styled.div<{ row: number; column: number }>`
  display: grid;
  grid-template-columns: ${({ column }) => `repeat(${column}, 1fr)`};
  grid-template-rows: ${({ row }) => `repeat(${row}, 1fr)`};
  gap: 20px; /* 그리드 아이템 간의 간격 */
  margin: 1rem;
  height: 55rem;
  width: 62rem;
  overflow: auto;
`;

export const StyledBody = styled.div`
  z-index: 500;
  display: flex;
  justify-content: center;
  font-size: 1.8rem;
  position: absolute;
  top: 0;
  margin-top: 5em;
`;

export const StyledAcceptedMember = styled.div<{ row: number }>`
  display: ${({ row }) => (row === 1 ? 'flex' : 'grid')};
  justify-content: center;
  align-items: center;
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 2rem;
  /* background-color: rgb(244, 255, 247); */
  width: ${({ row }) => 54 / row}rem;
  height: ${({ row }) => (row === 1 ? 5 : 8)}rem;
`;

export const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  font-size: 4px;
  margin: 0.7rem;
  padding: 0.4rem;
  border: 1px solid;
  border-radius: 3rem;
  background-color: white;
`;

export const StyledNameDiv = styled.div<{ name: string }>`
  display: flex;
  width: fit-content;
  text-align: center;
  align-items: center;
  font-weight: 600;
  margin: 0rem 1rem;
  color: ${({ name }) => (name === '모집 중...' ? 'lightgrey' : 'black')};
`;

export const StyledViewButton = styled.button<{ isClick: boolean }>`
  display: block;
  margin-left: 1rem;
  font-size: 1.5rem;
  width: 9rem;
  border-radius: 2rem;
  background-color: ${({ isClick }) => (isClick ? '#09cf00' : '')};
  border: ${({ isClick }) => (isClick ? '2px solid #00980f' : '')};
  &:hover {
    background-color: #00980f;
  }
`;
