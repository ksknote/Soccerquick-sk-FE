import react, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import axios from 'axios';
import MyFavoriteGroundList from '../components/MyPage/MyFavoriteGround/MyFavoriteGroundList';
import SearchMyReviewPost from '../components/MyPage/SearchMyPost/SearchMyReviewPost';
import SearchMyTeamPost from '../components/MyPage/SearchMyPost/SearchMyTeamPost';
import MyTeamPost from '../components/MyPage/SearchMyPost/MyTeamPost';
import SearchMyApplicationPost from '../components/MyPage/SearchMyPost/SearchMyApplicationPost';
import MyApplicatedTeamPost from '../components/MyPage/SearchMyPost/MyApplicatedTeamPost';
import { useSelector } from 'react-redux';
import { isLogInSelector } from '../redux/modules/Auth/authSelectors';
import alertModal from '../components/Commons/alertModal';
import MyPageHome from '../components/MyPage/MyPageHome';
import MyPageProfileLayout from '../components/MyPage/MyPageInfo/MyPageProfileLayout';
import { userSelector } from '../redux/modules/Auth/authSelectors';
import MyPageLayout from '../components/Template/MyPageLayout';

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
  leader_phone_number: string;
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
  const filteredMyTeamPosts = groupList.filter(
    (item: GroupPost) => item.leader_name === user?.name
  );
  // .map((item: GroupPost) => changeGroupObjectToArray(item));
  const navigate = useNavigate();

  const filteredRegistedTeamPosts = groupList.reduce(
    (acc: Array<GroupPost>, group: GroupPost) => {
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
    },
    []
  );

  useEffect(() => {
    if (isLogIn) {
      getUserData();
      axios
        .get(`${process.env.REACT_APP_API_URL}/groups`, {
          withCredentials: true,
        })
        .then((res) => res.data.data)
        .then((result) => {
          setGroupList(result);
        })
        .catch((err) => console.log(err));
    } else {
      alertModal('마이페이지는 로그인 후 사용해 주세요', 'warning');
      navigate('/');
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
    setFormData((prev) => userInfo);
  };

  return (
    <>
      <MyPageLayout>
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
          <Route path="/favorite" element={<MyFavoriteGroundList />} />
          <Route
            path="/myTeamList"
            element={<SearchMyTeamPost filteredItems={filteredMyTeamPosts} />}
          />
          <Route path="/myTeamList/:group_Id" element={<MyTeamPost />} />
          <Route
            path="/myApplicatedTeamList"
            element={
              <SearchMyApplicationPost
                filteredItems={filteredRegistedTeamPosts}
              />
            }
          />
          <Route
            path="/myApplicatedTeamList/:group_id"
            element={<MyApplicatedTeamPost />}
          />
          <Route path="/myReviewPost" element={<SearchMyReviewPost />} />
        </Routes>
      </MyPageLayout>
    </>
  );
}
