import styled from 'styled-components';

export const Team = {
  AuthorDiv: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    p {
      font-size: 1.3rem;
      padding-left: 1rem;
    }
    @media (min-width: 1024px) {
      p {
        font-size: 1.8rem;
        padding-left: 1rem;
      }
    }
  `,

  ImgDiv: styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    border: 0.1rem solid lightgray;
    @media (min-width: 1024px) {
      width: 3.5rem;
      height: 3.5rem;
    }
  `,

  DetailDiv: styled.div`
    font-size: 1.3rem;

    span {
      font-weight: 400;
      padding: 0 0.8rem;
      border-radius: 0.5rem;
      margin-right: 0.7rem;
      line-height: 2.5rem;
    }
    @media (min-width: 1024px) {
      font-size: 1.5rem;
      padding: 0.7rem 0;
      span {
        margin-right: 1rem;
      }
    }
  `,

  Gender: styled.span<{ gender?: string }>`
    color: ${({ gender }) => (gender === '여' ? '#ba4d1e' : '#17879d')};
    background-color: ${({ gender }) =>
      gender === '여' ? '#fcf6f6' : '#f6fbfc'};
  `,

  Position: styled.span<{ position: string }>`
    color: ${({ position }) => getColorByPosition(position)};
    background-color: #f8f7f7;
  `,

  Level: styled.span<{ level: string }>`
    color: ${({ level }) => getColorBySkill(level)};
    background-color: ${({ level }) => getBackgroundColorBySkill(level)};
  `,

  ButtonContainer: styled.div`
    display: flex;
    justify-content: flex-end;
    button:first-child {
      margin-right: 0.5rem;
    }
  `,
};

const getColorByPosition = (data: string) => {
  if (data === '골키퍼') {
    return 'rgb(232, 101, 47)';
  } else if (data === '필드플레이어') {
    return 'rgb(103, 109, 178)';
  } else if (data === '상관없음') {
    return '#616161';
  }
};

const getColorBySkill = (data: string) => {
  if (data === '프로') {
    return 'white';
  } else if (data === '세미프로') {
    return '#883532';
  } else if (data === '고급자') {
    return '#233D87';
  } else if (data === '중급자') {
    return '#B78638';
  } else if (data === '초급자') {
    return '#336939';
  } else if (data === '입문자') {
    return '#525056';
  }
};

const getBackgroundColorBySkill = (data: string) => {
  if (data === '프로') {
    return '#848484';
  } else if (data === '세미프로') {
    return '#FAE4E3';
  } else if (data === '고급자') {
    return '#ECF0FB)';
  } else if (data === '중급자') {
    return '#E6FAEA';
  } else if (data === '초급자') {
    return '#FDF1DC';
  } else if (data === '입문자') {
    return '#F2F1F1';
  }
};
