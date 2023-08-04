import react, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';
import MyPageBar from './MyPageBar';
import MyProfile from './MyPageInfo/MyPageProfile';
import { MyPageInfo } from './MyPageInfo/MyPageInfo';
import MyPageCheckPassword from './MyPageInfo/MyPageCheckPassword';
import MyFavoriteGroundList from './MyFavoriteGround/MyFavoriteGroundList';
import SearchMyTeamPost from './SearchMyPost/SearchMyTeamPost';
import SearchMyReviewPost from './SearchMyPost/SearchMyReviewPost';
import { useSelector } from 'react-redux';
import { isLogInSelector } from '../../ReduxStore/modules/Auth/authSelectors';
import SearchMyApplicationPost from './SearchMyPost/SearchMyApplicationPost';
import alertModal from '../Commons/alertModal';
import memoIcon from '../../styles/icon/myPageCategory/memoIcon.svg';
import reviewIcon from '../../styles/icon/myPageCategory/reviewIconBlack.svg';
import teamRegisterIcon from '../../styles/icon/myPageCategory/teamRegisterIconBlack.svg';
import uniformIcon from '../../styles/icon/myPageCategory/uniformIcon.svg';
import { FormDataType } from '../../Pages/MyPage';

interface MyPageProps {
  userData: FormDataType;
  myPost: number;
  registeredTeam: number;
}

function MyPage({ userData, myPost, registeredTeam }: MyPageProps) {
  const isLogIn = useSelector(isLogInSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogIn) {
      alertModal('마이페이지는 로그인 후 사용해 주세요', 'warning');
      navigate('/');
    }
  }, [isLogIn]);

  return (
    <MyPageHomeWrapper>
      <PageTitle>
        <p>마이페이지</p>
      </PageTitle>
      <MyPageInfoContainer>
        <UserProfile>
          <UserProfileTop>
            <StyledImgWrapper>
              <StyledProfileImg
                type="image"
                src={userData.profile}
                alt="profile"
              />
            </StyledImgWrapper>
            <StyledUserDetail>
              <StyledText bold>
                {userData.nick_name} <span>{userData.user_id}</span>
              </StyledText>
              <StyledText small>{userData.email}</StyledText>
              <StyledText small>{userData.phone_number}</StyledText>
            </StyledUserDetail>
          </UserProfileTop>
          <UserProfileBottom>
            <ProfileBottomItem onClick={() => navigate('/mypage/myTeamPost')}>
              <p>내가 쓴 글</p>
              <p>{myPost}</p>
            </ProfileBottomItem>
            <ProfileBottomItem
              onClick={() => navigate('/mypage/myApplicationPost')}
            >
              <p>신청한 팀</p>
              <p>{registeredTeam}</p>
            </ProfileBottomItem>
            <ProfileBottomItem onClick={() => navigate('/mypage/favorite')}>
              <p>즐겨찾는 경기장</p>
              <p>{userData.favoritePlaygrounds.length}</p>
            </ProfileBottomItem>
          </UserProfileBottom>
        </UserProfile>
        <MyPageCategryList>
          <li onClick={() => navigate('/mypage/myProfile')}>
            <span>
              <img src={uniformIcon} alt="" />
            </span>
            <span>내 프로필</span>
          </li>
          {/* <li onClick={() => navigate('/mypage/myTeamPost')}>
            <span>
              <img src={memoIcon} alt="" />
            </span>
            <span>나의 팀 모집 글</span>
          </li>
          <li onClick={() => navigate('/mypage/myApplicationPost')}>
            <span>
              <img src={teamRegisterIcon} alt="" />
            </span>
            <span>내가 신청한 팀</span>
          </li> */}
          <li onClick={() => navigate('/mypage/myReviewPost')}>
            <span>
              <img src={reviewIcon} alt="" />
            </span>
            <span>나의 리뷰</span>
          </li>
        </MyPageCategryList>
      </MyPageInfoContainer>
    </MyPageHomeWrapper>
  );
}

export default MyPage;

const MyPageHomeWrapper = styled.div`
  @media (min-width: 768px) {
    height: 100vh;
  }
`;

const PageTitle = styled.div`
  width: 90%;
  font-size: 2rem;
  font-weight: 600;
  padding: 2rem;
  margin: 2rem auto 0 auto;
  color: rgb(84, 84, 86);
  letter-spacing: -0.408px;
  @media (min-width: 768px) {
    width: 70rem;
  }
`;

const MyPageInfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  flex-direction: column;
  padding: 0 2rem;
  margin: 2rem auto;
  @media (min-width: 768px) {
    width: 70rem;
  }
`;

const UserProfile = styled.div`
  background: white;
  width: 100%;
  margin-bottom: 1.5rem;
  padding: 2rem;
  filter: drop-shadow(0 0 0.3rem #d3d3d3);
  border-radius: 2rem;
`;

const UserProfileTop = styled.div`
  border-bottom: 0.1rem solid rgb(235, 235, 235);
  display: flex;
  padding-bottom: 1rem;
`;

const UserProfileBottom = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const ProfileBottomItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  p {
    cursor: pointer;
    :first-child {
      color: gray;
      font-size: 1.2rem;
      padding-bottom: 0.5rem;
    }
    :last-child {
      font-size: 1.6rem;
      font-weight: 500;
    }
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
`;

const StyledProfileImg = styled.input`
  width: 8rem;
  height: 8rem;
  border-radius: 100%;
  background-color: white;
`;
const StyledText = styled.div<{ bold?: boolean; small?: boolean }>`
  margin-left: 2rem;
  font-weight: ${(props) => (props.bold ? 'bold' : '400')};
  font-size: ${(props) => (props.small ? '1.2rem' : '1.9rem')};
  color: ${(props) => (props.small ? '#727f88' : '#282B33')};
  line-height: ${(props) => props.small && '2rem'};
  span {
    color: gray;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 2.7rem;
  }
`;

const StyledUserDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MyPageCategryList = styled.ul`
  width: 100%;
  background: white;
  filter: drop-shadow(0 0 0.3rem #d3d3d3);
  border-radius: 2rem;

  li {
    padding: 1.7rem 2rem;
    font-size: 1.5rem;
    font-weight: 500;
    color: rgb(84, 84, 86);
    letter-spacing: -0.408px;
    cursor: pointer;
    img {
      width: 2.6rem;
      margin-right: 2rem;
    }
    :not(:last-child) {
      border-bottom: 0.1rem solid #e6e6e6;
    }
  }
`;
