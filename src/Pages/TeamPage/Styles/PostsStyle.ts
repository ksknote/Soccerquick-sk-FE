import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: grid;
  grid-gap: 40px 0px;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

export const StyledBox = styled.div`
  display: flex;
  margin-top: 0rem;
`;

export const StyledTitleBox = styled.div`
  display: flex;
  width: 100%;
  padding: 1.5rem 2rem 0 0;
`;

export const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 0rem 2rem;
  font-size: 1.9rem;
  font-weight: 500;
`;

export const StyledTitleInputText = styled.input`
  height: 4.5rem;
  padding-left: 1rem;
  width: 100%;
  border: 0.1rem solid #b2b2b2;
`;

export const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
`;

export const StyledInputText = styled.input`
  display: flex;
  padding-left: 1rem;
  width: 20rem;
  height: 4.5rem;
  text-align: start;
  align-items: center;
  border: 0.1rem solid #b2b2b2;
`;

export const StyledButton = styled.button<{ color?: string }>`
  width: 12rem;
  height: 4.7rem;
  font-weight: 500;
  margin: 6rem 1rem 0rem 1rem;
  border-radius: 1rem;
  background: ${({ color }) =>
    color === 'white' ? 'white' : 'var(--color--green)'};
  color: ${({ color }) => (color === 'white' ? 'green' : 'white')};
  border: ${({ color }) =>
    color === 'white' && '0.2rem solid rgb(191 211 186)'};
`;

// 여기까지 EditPage, PostPage Style

// 여기부터 ViewPage Style

export const StyledWrap = styled.div`
  width: 98.4rem;
  margin: 3rem auto;
`;

export const StyledPost = styled.div`
  border: 0.2rem solid lightgray;
  border-radius: 2rem;

  padding: 2.5rem;
`;

export const StyledHeader = styled.div<{ status: string }>`
  border-bottom: 0.2rem solid lightgray;
  h1 {
    font-size: 2.5em;
    font-weight: 600;
    span {
      color: ${({ status }) =>
        status === '모집중' ? 'var(--color--green)' : 'gray'};
    }
  }
`;

export const StyledBoardName = styled.div`
  color: #71c171;
  font-size: 1.7rem;
  font-weight: 600;
  padding: 0.3rem 0;
  display: inline-block;
  cursor: pointer;
  img {
    width: 0.8rem;
    vertical-align: middle;
    padding: 0 0 0.3rem 0;
    margin-right: 0.3rem;
  }
`;

export const StyledAuthorDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 2rem;
  p {
    font-size: 1.8rem;
    padding-left: 1rem;
  }
`;

export const StyledImgDiv = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  border: 0.2rem solid lightgray;
`;

export const StyledDetailDiv = styled.div`
  font-size: 2rem;

  padding: 2rem 0;
  h3 {
    font-size: 2.2rem;
  }
`;

export const StyledDetailLabel = styled.div`
  color: gray;
  padding-right: 2rem;
`;

export const StyledDetailLocationLi = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 1.3rem;
`;

export const StyledPositionContainer = styled.div`
  padding-top: 1rem;
`;

export const StyledPosition = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  filter: drop-shadow(0 0 0.2rem #a2a2a2);
  border-radius: 2rem;
  background: white;
  margin: 1.5rem 0;
  div:nth-child(2) {
    width: 40%;
  }
`;

export const StyledPositionIcon = styled.div<{ color?: string }>`
  width: 8rem;
  height: 8rem;
  background: ${({ color }) =>
    color === 'green' ? 'var(--color--green)' : 'orange'};
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
  img {
    width: 5.6rem;
    margin: ${({ color }) =>
      color === 'green' ? '1rem 0 0 0.7rem' : '0.4rem 0 0 0.7rem'};
  }
`;

export const StyledPositionName = styled.div`
  font-size: 2rem;
  font-weight: 500;
  color: #5e5c5c;
  div:last-child {
    font-size: 1.6rem;
    color: #ff5500;
    font-weight: 500;
  }
`;

export const StyledPositionDetail = styled.div<{ color?: string }>`
  p {
    font-size: 1.8rem;
    span {
      font-size: 3rem;
      font-weight: 500;
      color: ${({ color }) => (color === 'green' ? '#00ac00' : 'orange')};
      vertical-align: sub;
      padding: 0 0.4rem;
    }
  }
  padding-right: 5rem;
`;

export const StyledBody = styled.div`
  min-height: 20rem;
  padding: 2rem 0;
  h3 {
    font-size: 2.2rem;
  }
`;

export const StyledAuthorButtonContainer = styled.div`
  margin: 2rem auto;
  display: flex;
  height: 3rem;
  justify-content: flex-end;
  align-items: center;
  button {
    color: gray;
    background-color: white;
  }
  button:not(:first-child):before {
    content: '|';
    padding-right: 1.5rem;
    color: lightgray;
  }
`;

export const StyledCommentsDiv = styled.div`
  width: 100%;
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem;
  button {
    width: 11rem;
    height: 4.5rem;
    border-radius: 0.7rem;
    background-color: var(--color--green);
    color: white;
    font-size: 1.7rem;
    font-weight: 600;

    :first-child {
      margin-right: 1rem;
      background-color: white;
      color: #787878;
      filter: drop-shadow(0 0 0.2rem grey);
    }
  }
`;
