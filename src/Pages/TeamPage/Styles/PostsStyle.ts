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
width: 100%
  max-width: 120rem;
  @media (min-width: 1024px) {
    margin: 3rem auto;
  }
`;

export const StyledPost = styled.div`
  width: 100%;
  border: 0.1rem solid lightgray;
  border-radius: 2rem;
  padding: 1.5rem;
  @media (min-width: 1024px) {
    padding: 2.5rem;
    border: 0.2rem solid lightgray;
  }
`;

export const StyledHeader = styled.div<{ status: string }>`
  border-bottom: 0.15rem solid lightgray;
  h1 {
    font-size: 1.8em;
    font-weight: 600;
    margin: 0.5rem 0 1rem 0;
    span {
      color: ${({ status }) =>
        status === '모집중' ? 'var(--color--green)' : 'gray'};
    }
  }
  @media (min-width: 1024px) {
    border-bottom: 0.2rem solid lightgray;
    h1 {
      font-size: 2.5em;
      margin: 1.3rem 0;
    }
  }
`;

export const StyledBoardName = styled.div`
  color: #71c171;
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.3rem 0;
  display: inline-block;
  cursor: pointer;
  img {
    width: 0.6rem;
    vertical-align: middle;
    padding: 0 0 0.3rem 0;
    margin-right: 0.3rem;
  }
  @media (min-width: 1024px) {
    font-size: 1.7rem;
    img {
      width: 0.8rem;
    }
  }
`;

export const StyledAuthorDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 1rem;
  p {
    font-size: 1.3rem;
    padding-left: 0.5rem;
  }
  @media (min-width: 1024px) {
    padding-bottom: 2rem;
    p {
      font-size: 1.8rem;
      padding-left: 1rem;
    }
  }
`;

export const StyledImgDiv = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  border: 0.1rem solid lightgray;
  img {
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    border-radius: 100%;
  }
  @media (min-width: 1024px) {
    width: 4rem;
    height: 4rem;
  }
`;

export const StyledDetailDiv = styled.div`
  font-size: 1.4rem;
  padding: 1rem 0;

  @media (min-width: 1024px) {
    font-size: 2rem;
    padding: 2rem 0;
  }
`;

export const StyledSubTitle = styled.h3`
  font-size: 1.6rem;
  @media (min-width: 1024px) {
    font-size: 2.2rem;
  }
`;

export const StyledDetailLabel = styled.div`
  color: gray;
  padding-right: 1rem;
  @media (min-width: 1024px) {
    padding-right: 2rem;
  }
`;

export const StyledDetailLocationLi = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 0.7rem;
  @media (min-width: 1024px) {
    padding-bottom: 1.3rem;
  }
`;

export const StyledPositionContainer = styled.div`
  @media (min-width: 1024px) {
    padding-top: 1rem;
  }
`;

export const StyledPosition = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  filter: drop-shadow(0 0 0.2rem #a2a2a2);
  border-radius: 2rem;
  background: white;
  margin: 1.5rem 0;
`;

export const StyledPositionIcon = styled.div<{ color?: string }>`
  width: 5rem;
  height: 6rem;
  background: ${({ color }) =>
    color === 'green' ? 'var(--color--green)' : 'orange'};
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
  img {
    width: 3.5rem;
    margin: ${({ color }) =>
      color === 'green' ? '1rem 0 0 0.7rem' : '0.7rem 0 0 0.7rem'};
  }
  @media (min-width: 1024px) {
    width: 8rem;
    height: 8rem;
    img {
      width: 5.6rem;
      margin: ${({ color }) =>
        color === 'green' ? '1rem 0 0 0.7rem' : '0.4rem 0 0 0.7rem'};
    }
  }
`;

export const StyledPositionName = styled.div`
  width: 30%;
  font-weight: 500;
  color: #5e5c5c;
  div:last-child {
    color: #ff5500;
    font-size: 1.2rem;
    font-weight: 500;
  }
  @media (min-width: 1024px) {
    font-size: 2rem;
    div:last-child {
      font-size: 1.6rem;
    }
  }
`;

export const StyledPositionDetails = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

export const StyledPositionDetail = styled.div<{ color?: string }>`
  font-size: 1.2rem;
  padding-right: 1rem;
  line-height: 2.2rem;
  span {
    font-size: 1.7rem;
    font-weight: 500;
    line-height: 2.2rem;
    color: ${({ color }) => (color === 'green' ? '#00ac00' : 'orange')};
    padding: 0 0.4rem;
  }
  @media (min-width: 1024px) {
    p {
      font-size: 1.8rem;
      span {
        font-size: 3rem;
        padding: 0 0.4rem;
      }
    }
  }
`;

export const StyledBody = styled.div``;

export const StyledAuthorButtonContainer = styled.div`
  margin: 1rem auto 0 auto;
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
  @media (min-width: 1024px) {
    button {
      font-size: 1.7rem;
    }
    margin: 2rem auto;
  }
`;

export const StyledCommentsDiv = styled.div`
  width: 100%;
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem;
  button {
    width: 8rem;
    height: 3.7rem;
    border-radius: 0.7rem;
    background-color: var(--color--green);
    color: white;
    font-size: 1.3rem;
    font-weight: 600;

    :first-child {
      margin-right: 1rem;
      background-color: white;
      color: #787878;
      border: 0.15rem solid lightgray;
    }
  }
  @media (min-width: 1024px) {
    margin: 3rem;

    button {
      width: 11rem;
      height: 4.5rem;
      font-size: 1.7rem;
    }
  }
`;
