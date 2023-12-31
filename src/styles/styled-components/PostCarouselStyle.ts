import styled from 'styled-components';

export const PostCarousel = {
  Wrapper: styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    color: gray;
    padding-top: 10rem;
  `,

  CarouselWrapper: styled.div`
    overflow: hidden;
  `,

  CarouselHeader: styled.div`
    padding: 1rem 2rem;
    h2 {
      font-size: 2.1rem;
      font-weight: 500;
      color: #383636;
      margin: 0;
      padding-bottom: 0.7rem;
    }
    p {
      color: #9a9a9a;
      font-size: 1.3rem;
      font-weight: 500;
    }
    @media (max-width: 768px) {
      padding: 1rem 2rem;

      h2 {
        font-size: 1.8rem;
        padding-bottom: 0.5rem;
      }
      p {
        font-size: 1.2rem;
      }
    }
  `,

  ButtonContainer: styled.div`
    display: flex;
    justify-content: flex-end;
    > div {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    p {
      font-size: 1.5rem;
      color: #848484;
      cursor: pointer;
    }
    @media (max-width: 768px) {
      p {
        font-size: 1.3rem;
      }
    }
  `,

  ChevronButtons: styled.div`
    display: flex;
    border: 0.1rem solid lightgray;
    border-radius: 0.5rem;
    cursor: pointer;
    @media (max-width: 768px) {
      display: none;
    }
  `,

  ChevronButton: styled.div<{ activated: boolean; direction: string }>`
    padding: 0 1rem;
    font-size: 1.7rem;
    background-color: white;
    border-top-left-radius: ${({ direction }) =>
      direction === 'left' && '0.3rem'};
    border-bottom-left-radius: ${({ direction }) =>
      direction === 'left' && '0.3rem'};
    border-top-right-radius: ${({ direction }) =>
      direction === 'right' && '0.3rem'};
    border-bottom-right-radius: ${({ direction }) =>
      direction === 'right' && '0.3rem'};
    color: ${({ activated }) => (activated ? '#989898' : 'lightgray')};
    :first-child {
      border-right: 0.1rem solid lightgray;
    }
    :hover {
      background-color: #f2f3f7;
    }
    :active {
      background-color: #e1e1e1;
    }
  `,
};
