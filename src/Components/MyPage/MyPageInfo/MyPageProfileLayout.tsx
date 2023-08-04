import React, { useState } from 'react';
import styled from 'styled-components';
import MyProfile from './MyPageProfile';
import { MyPageInfo } from './MyPageInfo';
import MyPageCheckPassword from './MyPageCheckPassword';
import { FormDataType } from '../../../Pages/MyPage';
import { useNavigate } from 'react-router-dom';

interface MyPageInfoProps {
  userData: FormDataType;
  setUserData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

function MyPageProfileLayout({ userData, setUserData }: MyPageInfoProps) {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [checkMyPassword, setCheckPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File>();

  return (
    <>
      <PageTitle onClick={() => navigate(-1)}>
        <span>&lt; &nbsp; 내 프로필</span>
      </PageTitle>
      <MyPageInfoContainer>
        {checkMyPassword ? (
          <>
            <MyProfile
              formData={userData}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
            <MyPageInfo
              oldPassword={password}
              userData={userData}
              setUserData={setUserData}
              selectedImage={selectedImage}
            />
          </>
        ) : (
          <MyPageCheckPassword
            password={password}
            setPassword={setPassword}
            setCheckPassword={setCheckPassword}
          />
        )}
      </MyPageInfoContainer>
    </>
  );
}

export default MyPageProfileLayout;

const MyPageInfoContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  max-width: 98rem;
  padding: 0 2rem;
  margin: auto;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  @media (max-width: 768px) {
    padding: 0 1rem 5rem 1rem;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const PageTitle = styled.div`
  width: 100%;
  font-size: 2rem;
  font-weight: 600;
  padding: 2rem 0 0 2rem;
  margin: 0 auto;
  color: rgb(84, 84, 86);
  letter-spacing: -0.408px;
  span {
    cursor: pointer;
  }
  @media (min-width: 768px) {
    width: 85rem;
    padding: 2rem;
    margin: 2rem auto 0 auto;
  }
`;
