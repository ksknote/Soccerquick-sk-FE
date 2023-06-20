import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AUTH_ACTIONS } from '../../ReduxStore/modules/Auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../ReduxStore/modules/Auth/authSelectors';
import alertModal from './alertModal';
import axios from 'axios';

export function MyPageMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const handleLoginOutClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const result = await alertModal('로그아웃 하시겠습니까?', 'submit');
    if (result) {
      handleAlertConfirm();
    }
  };
  const handleAlertConfirm = async () => {
    dispatch(AUTH_ACTIONS.logout());

    // logout
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/auths/logout`, {
        withCredentials: true,
      })
      .then(() => {
        navigate(window.location.pathname);
      })
      .catch((e) => console.log(e));
  };
  return (
    <StyledMenu>
      <StyledMenuProfile>
        <StyledImgWrapper>
          <StyledProfileImg type="image" src={user?.profile} alt="profile" />
        </StyledImgWrapper>
        <StyledProfileInfo
          title={user ? user.nickname : '미로그인'}
          onClick={() => {
            navigate('/mypage');
          }}
        >
          {user ? `${user.nickname}님` : '미로그인'}
        </StyledProfileInfo>
      </StyledMenuProfile>
      <StyledMenuItem onClick={handleLoginOutClick}>로그아웃</StyledMenuItem>
      {(user?.role === 'admin' || user?.role === 'manager') && (
        <AdminButton
          onClick={() => {
            navigate('/admin');
          }}
        >
          <ImgDiv />
        </AdminButton>
      )}
    </StyledMenu>
  );
}

const StyledMenu = styled.div`
  display: flex;
  padding: 0.5rem 0;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 2rem;

  & > div:nth-child(1)::after {
    content: '|';
    align-self: center;
    padding-bottom: 0.3rem;
    color: #e5e5e5;
  }
`;

const StyledMenuProfile = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1.5rem;
`;

const StyledProfileImg = styled.input`
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  background-color: white;
  border: 1px solid #e5e5e5;
`;

const StyledProfileInfo = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  cursor: pointer;
  font-size: 1.4rem;
  margin-bottom: 0.2rem;
  width: 6.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledMenuItem = styled.div`
  flex: 2;
  text-align: center;
  cursor: pointer;
  padding-top: 0.4rem;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  color: rgb(62, 84, 99);
  font-size: 1.4rem;
  &:first-child {
    margin-top: 15px;
  }
`;

const AdminButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: #fff;

  & > img {
    width: 1.7rem;
    height: 1.7rem;
    background-image: url('/images/gear.png');
    background-size: cover;
    transition: background-image 0.3s ease;
  }
`;

const ImgDiv = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  background-image: url('/Images/settings.png');
  background-size: cover;
  transition: background-image 0.1s ease, transform 1s ease;

  &:hover {
    background-image: url('/images/settings2.png');
    transform: rotate(360deg);
  }
`;
