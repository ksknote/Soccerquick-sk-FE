import react from 'react';
import styled from 'styled-components';
import { FormData } from '../../Pages/MyPage';

function MyProfile(props: { formData: FormData }) {
  const { name, nick_name, user_id, email, phone_number } = props.formData;
  const formedPhoneNumber = phone_number.replace(
    /(\d{3})(\d{3,4})(\d{4})/,
    '$1-$2-$3'
  );
  return (
    <StyledProfileContainer>
      <StyledProfileTop>
        <StyledImgWrapper>
          <StyledProfileImg src={'/logo192.png'} alt="profile" />
        </StyledImgWrapper>
        <StyledText bold>{`${name} (${nick_name})`}</StyledText>
        <StyledText small>{user_id}</StyledText>
      </StyledProfileTop>
      <StyledProfileBottom>
        {' '}
        <StyledText small>이메일</StyledText>
        <StyledText>{email}</StyledText>
        <StyledText small>휴대폰 번호</StyledText>
        <StyledText>{formedPhoneNumber}</StyledText>
      </StyledProfileBottom>
    </StyledProfileContainer>
  );
}

export default MyProfile;

const StyledProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: start;
  width: 25rem;
  height: 64%;

  background: rgb(247 247 247);
  border-radius: 16px;
`;

const StyledProfileTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 47%;
  margin: 0.3rem;
  background-color: #fdfdfd;
  border-bottom: 1px solid rgb(247 247 247);
  border-radius: 16px 16px 0 0;
`;
const StyledProfileBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 43%;
  background-color: #fdfdfd;
  border-radius: 0 0 16px 16px;
  & > div:nth-child(2) {
    margin-bottom: 2.5rem;
  }
`;

const StyledImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9rem;
  height: 9rem;
  border-radius: 100%;
  background-color: rgb(247 247 247);
  margin-bottom: 2.5rem;
`;

const StyledProfileImg = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 100%;
  background-color: white;
`;

const StyledText = styled.div<{ bold?: boolean; small?: boolean }>`
  margin: 0.5rem;
  font-weight: ${(props) => (props.bold ? 'bold' : '400')};
  font-size: ${(props) => (props.small ? '12px' : '14px')};
  color: ${(props) => (props.small ? '#727f88' : '#282B33')};
`;
