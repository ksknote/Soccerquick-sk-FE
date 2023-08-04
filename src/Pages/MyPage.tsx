import react, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyFavoriteGroundList from '../Components/MyPage/MyFavoriteGround/MyFavoriteGroundList';
import SearchMyTeamPost from '../Components/MyPage/SearchMyPost/SearchMyTeamPost';
import SearchMyReviewPost from '../Components/MyPage/SearchMyPost/SearchMyReviewPost';
import { useSelector } from 'react-redux';
import { isLogInSelector } from '../ReduxStore/modules/Auth/authSelectors';
import SearchMyApplicationPost from '../Components/MyPage/SearchMyPost/SearchMyApplicationPost';
import alertModal from '../Components/Commons/alertModal';
import MyPageHome from '../Components/MyPage/MyPageHome';
import MyPageProfileLayout from '../Components/MyPage/MyPageInfo/MyPageProfileLayout';
import { userSelector } from '../ReduxStore/modules/Auth/authSelectors';
import {
  changeGroupObjectToArray,
  changeMyApplicantObjectToArray,
} from '../Components/MyPage/changeObjectToArray';

export type FormDataType = {
  user_id: string;
  name: string;
  nick_name: string;
  profile: string;
  email: string;
  phone_number: string;
  gender: string;
  favoritePlaygrounds: string[];
};

type Applicant = {
  name: string;
};

type Accept = {
  name: string;
};

export type GroupPost = {
  group_id: string;
  leader_name: string;
  title: string;
  location: string;
  status: string;
  gk_count: number;
  player_count: number;
  gk_current_count: number;
  player_current_count: number;
  applicant: Array<Applicant>;
  accept: Array<Accept>;
  createdAt: string;
  updatedAt: string;
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
    favoritePlaygrounds: [],
  });
  const isLogIn = useSelector(isLogInSelector);
  const [groupList, setGroupList] = useState<GroupPost[]>([]);
  const user = useSelector(userSelector);
  const filteredMyTeamPosts = groupList
    .filter((item: GroupPost) => item.leader_name === user?.name)
    .map((item: GroupPost) => changeGroupObjectToArray(item));
  const [favoritePlaygounds, setFavoritePlaygrounds] = useState<string[]>([]);
  const navigate = useNavigate();

  const filteredRegistedTeamPosts = groupList
    .reduce((acc: Array<GroupPost>, group: GroupPost) => {
      const filteredApplicants = group.applicant?.filter(
        (applicant) => applicant.name === user?.name
      );
      const fillterdAcceptedApplicants = group.accept?.filter(
        (accept) => accept.name === user?.name
      );

      if (filteredApplicants && filteredApplicants.length > 0) {
        const filteredGroup: GroupPost = {
          ...group,
          applicant: filteredApplicants,
        };

        return [...acc, filteredGroup];
      } else if (
        fillterdAcceptedApplicants &&
        fillterdAcceptedApplicants.length > 0
      ) {
        const filteredGroup: GroupPost = {
          ...group,
          accept: fillterdAcceptedApplicants,
        };

        return [...acc, filteredGroup];
      }

      return acc;
    }, [])
    .map((item: GroupPost) => changeMyApplicantObjectToArray(item));

  useEffect(() => {
    if (isLogIn) {
      getUserData();
    } else {
      alertModal('마이페이지는 로그인 후 사용해 주세요', 'warning');
      navigate('/');
    }
  }, [isLogIn]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/groups`, {
        withCredentials: true,
      })
      .then((res) => res.data.data)
      .then((result) => {
        setGroupList(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const getUserData = async () => {
    const userInfo = await axios
      .get(`${process.env.REACT_APP_API_URL}/users/`, {
        withCredentials: true,
      })
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => console.log(err));
    setFormData((prev) => userInfo);
    setFavoritePlaygrounds(userInfo.favoritePlaygrounds);
  };

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <MyPageHome
              userData={formData}
              myPost={filteredMyTeamPosts.length}
              registeredTeam={filteredRegistedTeamPosts.length}
            />
          }
        />
        <Route
          path="/myProfile"
          element={
            <MyPageProfileLayout
              userData={formData}
              setUserData={setFormData}
            />
          }
        />
        <Route
          path="/favorite"
          element={
            <MyFavoriteGroundList favoritePlaygrounds={favoritePlaygounds} />
          }
        />
        <Route
          path="/myTeamPost"
          element={<SearchMyTeamPost filteredItems={filteredMyTeamPosts} />}
        />
        <Route
          path="/myApplicationPost"
          element={
            <SearchMyApplicationPost
              filteredItems={filteredRegistedTeamPosts}
            />
          }
        />
        <Route path="/myReviewPost" element={<SearchMyReviewPost />} />
      </Routes>

      <Footer />
    </>
  );
}

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-evenly;
  max-width: 120rem;
  padding: 0 2rem;
  margin: 2rem auto;
  position: relative;
  background-color: #fff;

  & > div {
    margin: 5rem 0;
  }
`;
