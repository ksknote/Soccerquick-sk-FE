import styled from 'styled-components';

export const Post = {
  Wrapper: styled.div`
    width: 100%;
    border: 0.1rem solid lightgray;
    border-radius: 2rem;
    padding: 1.5rem;
    @media (min-width: 768px) {
      width: 768px;
      margin: auto;
    }
    @media (min-width: 1024px) {
      padding: 2.5rem;
      border: 0.1rem solid lightgray;
    }
  `,

  Header: styled.div`
    padding-bottom: 1.5rem;
    border-bottom: 0.1rem solid lightgray;
    h1 {
      font-size: 1.8em;
      font-weight: 600;
      margin: 1.5rem 0;
    }
    @media (min-width: 1024px) {
      padding-bottom: 2rem;
      border-bottom: 0.1rem solid lightgray;
      h1 {
        font-size: 2.5em;
        margin: 2.5rem 0;
      }
    }
  `,
  BoardName: styled.div`
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
  `,

  AuthorDiv: styled.div`
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    p {
      font-size: 1.3rem;
    }
    @media (min-width: 1024px) {
      p {
        font-size: 1.6rem;
      }
    }
  `,

  ImgDiv: styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    border: 0.1rem solid lightgray;
    margin-right: 0.7rem;
    img {
      width: 3rem;
      height: 3rem;
      object-fit: cover;
      border-radius: 100%;
    }
    @media (min-width: 1024px) {
      width: 3.5rem;
      height: 3.5rem;
      img {
        width: 3.5rem;
        height: 3.5rem;
      }
    }
  `,

  PostDate: styled.p`
    color: gray;
    font-size: 1.3rem;
    :before {
      content: '・';
    }
    @media (min-width: 1024px) {
      font-size: 1.5rem;
    }
  `,

  AuthorButtonContainer: styled.div`
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
  `,
};

// EditPage, PostPage Style

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
