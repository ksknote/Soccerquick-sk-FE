import styled from 'styled-components';

// TeamPageComments

export const StyledCommentContainer = styled.div`
  width: 100%;
  margin: 1rem auto;
`;

export const StyledCommentTitle = styled.h2`
  font-size: 2.2rem;
  padding: 1rem 0;
  img {
    width: 4.3rem;
    vertical-align: middle;
    margin-right: 0.4rem;
  }
`;

export const CommentLiContainer = styled.div`
  padding: 2rem;
  background-color: white;
  border-radius: 2rem;
  filter: drop-shadow(0 0 0.2rem #c6c6c6);
  :not(first-child) {
    margin-top: 2rem;
  }
`;

export const StyledAuthorDiv = styled.div<{ gender?: string }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 1rem;
  p {
    font-size: 1.8rem;
    padding-left: 1rem;
  }
`;

export const StyledImgDiv = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 100%;
  border: 0.2rem solid lightgray;
`;

export const StyledCommentDetailDiv = styled.div`
  font-size: 1.7rem;
  padding: 0.7rem 0;
  > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 0.6rem;
  }
  span {
    font-weight: 400;
    padding: 0 0.8rem;
    border-radius: 0.5rem;
    margin-right: 1rem;
  }
`;

export const StyledGender = styled.span<{ gender?: string }>`
  color: ${({ gender }) => (gender === '여' ? '#ba4d1e' : '#17879d')};
  background-color: ${({ gender }) =>
    gender === '여' ? '#fcf6f6' : '#f6fbfc'};
`;

export const StyledPosition = styled.span<{ position: string }>`
  color: ${({ position }) => getColorByPosition(position)};
  background-color: #f8f7f7;
`;

export const getColorByPosition = (data: string) => {
  if (data === '골키퍼') {
    return 'rgb(232, 101, 47)';
  } else if (data === '필드플레이어') {
    return 'rgb(103, 109, 178)';
  } else if (data === '상관없음') {
    return '#616161';
  }
};

export const StyledLevel = styled.span<{ level: string }>`
  color: ${({ level }) => getColorBySkill(level)};
  background-color: ${({ level }) => getBackgroundColorBySkill(level)};
`;

export const getColorBySkill = (data: string) => {
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
export const getBackgroundColorBySkill = (data: string) => {
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

export const StyledContents = styled.div`
  font-size: 2rem;
  padding: 1rem 0;
`;

export const StyledCommentButtons = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    width: 11rem;
    height: 4.5rem;
    border-radius: 0.7rem;
    background-color: var(--color--green);
    color: white;
    font-size: 1.7rem;
    font-weight: 600;
    img {
      width: 2rem;
      vertical-align: middle;
      padding: 0 0.3rem 0.2rem 0;
    }

    :first-child {
      margin-right: 1rem;
      background-color: white;
      color: #787878;
      filter: drop-shadow(0 0 0.1rem grey);
    }
  }
`;

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
  justify-content: center;
  align-items: center;
  width: 70rem;
  height: 26rem;
  background-color: rgba(255, 255, 255);
  z-index: 501;
`;

export const DetailPage = styled.div`
  z-index: 900;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: beige;
  width: 90%;
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

export const StyledHeader = styled.div`
  z-index: 901;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  margin-top: 2rem;
  padding-bottom: 1rem;
  width: 90%;
  border-bottom: 1px solid #dddddd;
`;

export const StyledSubTitle = styled.div`
  z-index: 500;
  font-size: 1.8rem;
  position: absolute;
  top: 0;
  margin-top: 12.5rem;
`;

export const StyledBlock = styled.div`
  z-index: 500;
  display: block;
  align-items: center;
  border-radius: 2rem;
  margin: 0.7rem;
  padding: 1rem 1rem;
`;

export const StyledInput = styled.input`
  z-index: 901;
  width: 8rem;
  padding: 0.5rem 1.3rem;
`;

export const StyledSpan = styled.span`
  z-index: 10;
  display: inline-flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-top: 0.6rem;
  width: 6rem;
`;

export const StyledButtonContainer = styled.div`
  z-index: 899;
  display: flex;
  font-size: 1.8rem;
  justify-content: center;
  position: absolute;
  top: 0;
  margin-left: 44rem;
  margin-top: 20rem;
  width: 90%;
  border-radius: 1rem;
`;

export const StyledButton = styled.button`
  z-index: 899;
  margin: 0rem 1.5rem;
  height: 4rem;
  padding: 0rem 2rem;
  border-radius: 2rem;
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
