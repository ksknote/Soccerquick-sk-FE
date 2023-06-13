import react, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyPageBar from '../Components/MyPage/MyPageBar';
import MyProfile from '../Components/MyPage/MyPageInfo/MyPageProfile';
import { MyPageInfo } from '../Components/MyPage/MyPageInfo/MyPageInfo';
import MyPageCheckPassword from '../Components/MyPage/MyPageInfo/MyPageCheckPassword';
import MyFavoriteGroundList from '../Components/MyPage/MyFavoriteGround/MyFavoriteGroundList';
import SearchMyTeamPost from '../Components/MyPage/SearchMyPost/SearchMyTeamPost';
import SearchMyReviewPost from '../Components/MyPage/SearchMyPost/SearchMyReviewPost';
import { useSelector } from 'react-redux';
import { isLogInSelector } from '../store/selectors/authSelectors';
import SearchMyApplicationPost from '../Components/MyPage/SearchMyPost/SearchMyApplicationPost';

export type FormDataType = {
  user_id: string;
  name: string;
  nick_name: string;
  profile: string;
  email: string;
  phone_number: string;
  gender: string;
};

export function MyPage() {
  const [formData, setFormData] = useState<FormDataType>({
    user_id: '',
    name: '',
    nick_name: '',
    profile: '',
    email: '',
    phone_number: '',
    gender: '',
  });

  const [checkedBarItem, setCheckedBarItem] = useState(1);
  const [checkMyPassword, setCheckPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState<File>();
  const isLogIn = useSelector(isLogInSelector);

  useEffect(() => {
    if (isLogIn) {
      getUserData();
    }
  }, [isLogIn]);

  const getUserData = async () => {
    const userInfo = await axios
      .get(`${process.env.REACT_APP_API_URL}/users/`, {
        withCredentials: true,
      })
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => console.log(err));
    setFormData((prev) => ({
      ...prev,
      user_id: userInfo.user_id,
      name: userInfo.name,
      nick_name: userInfo.nick_name,
      profile: userInfo.profile,
      email: userInfo.email,
      phone_number: userInfo.phone_number,
      gender: userInfo.gender,
    }));
  };

  return (
    <>
      <Header />
      <MyPageBar
        checkedBarItem={checkedBarItem}
        setCheckedBarItem={setCheckedBarItem}
      />
      {checkedBarItem === 1 ? (
        <MyPageInfoContainer>
          {checkMyPassword ? (
            <>
              <MyProfile
                formData={formData}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
              <MyPageInfo
                oldPassword={password}
                userData={formData}
                setUserData={setFormData}
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
      ) : (
        ''
      )}
      {checkedBarItem === 2 ? (
        <MyPageContainer>
          <SearchMyTeamPost />
          <SearchMyApplicationPost />
          <SearchMyReviewPost />
        </MyPageContainer>
      ) : (
        ''
      )}
      {checkedBarItem === 3 ? (
        <MyPageContainer>
          <MyFavoriteGroundList />
        </MyPageContainer>
      ) : (
        ''
      )}

      <Footer />
    </>
  );
}

const MyPageInfoContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 98.4rem;
  height: 85rem;
  padding: 0 2rem;
  margin: 2rem auto;
  background-color: rgb(247 247 247);
`;

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-evenly;
  width: 98.4rem;
  height: 100%;
  padding: 0 2rem;
  margin: 2rem auto;
  position: relative;
  background-color: #fff;

  & > div {
    margin: 5rem 0;
  }
`;
