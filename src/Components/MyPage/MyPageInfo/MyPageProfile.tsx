import react from 'react';
import styled from 'styled-components';
import alertModal from '../../Commons/alertModal';
import { FormDataType } from '../../../Pages/MyPage';

type MyProfileProps = {
  formData: FormDataType;
  selectedImage: File | undefined;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | undefined>>;
};

function MyProfile({
  formData,
  selectedImage,
  setSelectedImage,
}: MyProfileProps) {
  const { name, nick_name, profile, user_id, email, phone_number } = formData;

  const formedPhoneNumber = phone_number.replace(
    /(\d{3})(\d{3,4})(\d{4})/,
    '$1-$2-$3'
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    } else {
      alertModal('이미지를 선택해주세요.', 'warning');
    }
  };

  return (
    <StyledProfileContainer>
      <StyledProfileTop>
        <StyledImgWrapper>
          <StyledProfileImg
            type="image"
            src={selectedImage ? URL.createObjectURL(selectedImage) : profile}
            alt="profile"
          />
        </StyledImgWrapper>
        <StyledInputLabel>
          이미지 변경
          <StyledFileInput
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
        </StyledInputLabel>

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
  border-radius: 16px;

  @media (max-width: 768px) {
    align-self: center;
    flex-direction: row;
    width: 60rem;
    padding-top: 2.5rem;
  }
`;

const StyledProfileTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  margin: 0.3rem;
  background-color: #fdfdfd;
  border-bottom: 1px solid rgb(247 247 247);
  border-radius: 16px 16px 0 0;

  @media (max-width: 768px) {
    width: 50%;
    height: 100%;
    margin: 0;
    border-radius: 16px 0 0 16px;
  }
`;
const StyledProfileBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40%;
  background-color: #fdfdfd;
  border-radius: 0 0 16px 16px;
  & > div:nth-child(2) {
    margin-bottom: 2.5rem;
  }

  @media (max-width: 768px) {
    width: 50%;
    height: 100%;
    border-radius: 0 16px 16px 0;
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
  margin-bottom: 1rem;
`;

const StyledProfileImg = styled.input`
  width: 8rem;
  height: 8rem;
  border-radius: 100%;
  background-color: white;
`;

const StyledInputLabel = styled.label`
  width: 8rem;
  height: 2.4rem;
  border: 1px solid #727f88;
  padding: 0.3rem;
  border-radius: 0.8rem;
  color: #727f88;
  background-color: rgb(249, 249, 249);
  cursor: pointer;
  font-size: 5px;
  text-align: center;

  &:hover {
    color: rgb(249, 249, 249);
    background-color: #727f88;
  }
`;

const StyledFileInput = styled.input`
  opacity: 0;
`;

const StyledText = styled.div<{ bold?: boolean; small?: boolean }>`
  margin: 0.5rem;
  font-weight: ${(props) => (props.bold ? 'bold' : '400')};
  font-size: ${(props) => (props.small ? '12px' : '14px')};
  color: ${(props) => (props.small ? '#727f88' : '#282B33')};
`;
