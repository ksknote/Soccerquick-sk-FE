import styled from 'styled-components';

// SubmitForFindingMember

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
  z-index: 500;
`;

export const ModalPage = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  background-color: rgba(255, 255, 255);
  border-radius: 2rem;
  z-index: 501;
  padding: 2rem;
  @media (min-width: 768px) {
    width: 70rem;
  }
  @media (min-width: 1024px) {
  }
`;

export const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  h2 {
    font-size: 1.8rem;
    font-weight: 500;
    margin: 0;
  }
`;

export const StyledExitButton = styled.button`
  background: none;
  font-size: 1.7rem;
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

export const DetailPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 2.3rem;
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
    text-align: center;
  }
`;

export const StyledOption = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
`;

export const StyledSubTitle = styled.div`
  font-size: 1.8rem;
`;

export const StyledDescription = styled.p`
  font-size: 1.2rem;
  color: #51a451;
  padding: 1.5rem 0;
  text-align: center;
  @media (min-width: 1024px) {
    font-size: 1.4rem;
  }
`;

export const StyledBlock = styled.div``;

export const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  min-height: 7rem;
  padding: 0.5rem 1.3rem;
  border: 0.1rem solid lightgray;
`;

export const StyledSpan = styled.div`
  margin: 1rem 0;
  font-size: 1.4rem;
  @media (min-width: 768px) {
    font-size: 1.6rem;
  }
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  font-size: 1.8rem;
  justify-content: center;
  width: 100%;
`;

export const StyledButton = styled.button`
  width: 8rem;
  height: 3.5rem;
  margin: 0rem 0.5rem;
  padding: 0rem 2rem;
  border-radius: 1rem;
  color: white;
  background: var(--color--green);
  :first-child {
    background: white;
    color: var(--color--green);
    border: 0.1rem solid lightgray;
  }
  @media (min-width: 1024px) {
    height: 4rem;
    font-size: 1.6rem;
  }
`;

// FindingMembers

export const StyledBox = styled.div`
  display: flex;
  margin-top: 0rem;
`;
export const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 0rem 2rem;
  font-size: 1.9rem;
  font-weight: 500;
`;
export const StyledSmallTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 0rem 2rem;
  font-size: 1.7rem;
`;

export const StyledInputNumber = styled.input`
  display: flex;
  padding-left: 1rem;
  width: 8rem;
  height: 4rem;
  text-align: center;
  border: 0.1rem solid #b2b2b2;
`;
