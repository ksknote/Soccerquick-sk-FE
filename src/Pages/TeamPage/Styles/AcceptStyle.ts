import styled from 'styled-components';
export const StyledBody = styled.div`
  width: 100%;
  height: 31rem;
  display: flex;
  justify-content: center;
  font-size: 1.8rem;
`;
export const StyledGridDiv = styled.div<{ column: number }>`
  display: grid;
  grid-template-columns: ${({ column }) => `repeat(${column}, 1fr)`};
  gap: 1rem;
  margin-top: 1rem;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  @media (min-width: 1024px) {
    gap: 2rem;
  }
`;

export const StyledAcceptedMember = styled.div<{ row: number }>`
  display: ${({ row }) => (row === 1 ? 'flex' : 'grid')};
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 1.3rem;
  border: 1px solid lightgray;
  border-radius: 2rem;
  width: 100%;
  height: ${({ row }) => (row === 1 ? '100%' : '100%')};
  @media (min-width: 1024px) {
    padding: 1.5rem;
  }
`;

export const StyledMemberHeader = styled.div<{ row: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${({ row }) => row !== 1 && 'column'};
  justify-content: space-between;
  padding-bottom: ${({ row }) => row === 1 && '1rem'};
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
  font-size: 1.4rem;
  font-weight: 500;
  margin: 0rem 1rem;
  color: ${({ name }) => (name === '모집 중...' ? 'lightgrey' : 'black')};
  @media (min-width: 1024px) {
    font-size: 1.8rem;
  }
`;

export const StyledContent = styled.div`
  font-size: 1.3rem;
  span {
    font-weight: 500;
    color: gray;
    padding-right: 0.5rem;
  }
  @media (min-width: 1024px) {
    span {
      font-weight: 400;
    }
    font-size: 1.7rem;
  }
`;

export const StyledViewButton = styled.button<{ isClick: boolean }>`
  width: 7.5rem;
  height: 2.5rem;
  display: block;
  font-size: 1.3rem;
  color: white;
  border-radius: 2rem;
  background-color: ${({ isClick }) =>
    isClick ? 'var(--color--green)' : 'lightgray'};
  &:hover {
    background-color: #00980f;
  }
  :first-child {
    margin-right: 1rem;
  }
  @media (min-width: 1024px) {
    width: 9rem;
    height: 3rem;
    font-size: 1.5rem;
  }
`;
