import styled from 'styled-components';

export const Comment = {
  Container: styled.div`
    width: 100%;
    margin: 1rem auto;
    @media (min-width: 768px) {
      width: 768px;
      margin: auto;
    }
  `,

  Title: styled.h2`
    font-size: 1.6rem;
    img {
      width: 3rem;
      vertical-align: middle;
      margin-right: 0.4rem;
    }
    @media (min-width: 1024px) {
      font-size: 2.2rem;
      padding: 1rem 0;
      img {
        width: 4.3rem;
      }
    }
  `,

  AuthorDiv: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  `,

  UserInfo: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  `,

  ImgDiv: styled.div`
    width: 3.5rem;
    height: 3.5rem;
    background: white;
    border-radius: 100%;
    border: 0.1rem solid lightgray;
    @media (min-width: 1024px) {
      width: 4rem;
      height: 4rem;
    }
    img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 100%;
      object-fit: cover;
      @media (min-width: 1024px) {
        width: 4rem;
        height: 4rem;
      }
    }
  `,

  Author: styled.p`
    font-size: 1.3rem;
    font-weight: 500;
    @media (min-width: 1024px) {
      font-size: 1.8rem;
    }
  `,

  PostDate: styled.div`
    color: gray;
    font-size: 1.1rem;
    @media (min-width: 1024px) {
      font-size: 1.4rem;
    }
  `,

  Body: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,

  ContentsWrapper: styled.div`
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    @media (min-width: 1024px) {
      padding: 2.5rem 0;
    }
  `,

  Contents: styled.div`
    font-size: 1.3rem;
    @media (min-width: 1024px) {
      font-size: 1.8rem;
    }
  `,

  TextArea: styled.textarea`
    width: 100%;
    height: 70%;
    border: none;
    resize: none; /* 크기 조정 비활성화 */
    margin: 1rem 0;
    font-size: 1.3rem;
    :focus {
      outline: none;
    }
    @media (min-width: 1024px) {
      font-size: 1.8rem;
      ::placeholder {
        font-size: 1.8rem;
      }
    }
  `,
  ButtonsFooter: styled.div`
    display: flex;
    justify-content: flex-end;
    button:last-child {
      margin-left: 0.7rem;
      @media (min-width: 1024px) {
        margin-left: 1rem;
      }
    }
  `,

  SpaceBetweenFooter: styled.div`
    display: flex;
    justify-content: space-between;
    button:last-child {
      margin-left: 0.7rem;
      @media (min-width: 1024px) {
        margin-left: 1rem;
      }
    }
  `,

  TextButton: styled.button`
    background: transparent;
    color: gray;
    padding: 0 0.3rem;
    @media (min-width: 1024px) {
      font-size: 1.7rem;
    }
  `,

  //이미지 첨부 관련 스타일드 컴포넌트

  Image: styled.div`
    img {
      max-height: 20rem;
      border-radius: 0.7rem;
      @media (min-width: 1024px) {
        max-height: 30rem;
      }
    }
  `,

  SelectedImageContainer: styled.div`
    button {
      position: absolute;
      top: -1rem;
      right: -1rem;
      width: 2.2rem;
      height: 2.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      font-size: 1.4rem;
      color: grey;
      background: white;
      box-sizing: border-box;
      border: 0.1rem solid grey;
      border-radius: 100%;
    }
  `,

  SelectedImage: styled.div`
    position: relative;
    width: 5rem;
    height: 5rem;
    border: 0.1rem solid #e6e6e6;
    margin: 1rem 0;
    img {
      width: 100%;
      height: 100%;
    }
    @media (min-width: 768px) {
      width: 8rem;
      height: 8rem;
    }
  `,

  InputTypeFileLabel: styled.label`
    cursor: pointer;
    display: flex;
    align-items: center;
    img {
      width: 2.2rem;
      @media (min-width: 1024px) {
        width: 3rem;
        height: 3rem;
      }
    }
  `,

  InputTypeFile: styled.input`
    display: none;
  `,
};
