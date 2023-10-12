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
    @media (min-width: 1024px) {
      padding-bottom: 2rem;
      border-bottom: 0.1rem solid lightgray;
    }
  `,

  Title: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2.5rem 0;
    h1 {
      margin: 0;
      font-size: 2.3em;
      font-weight: 500;
    }
    @media (min-width: 1024px) {
      margin: 2.7rem 0;
      h1 {
        font-size: 2.5rem;
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
        font-size: 1.5rem;
      }
      margin: 2rem auto;
    }
  `,
};
