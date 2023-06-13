import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AUTH_ACTIONS } from '../../store/reducers/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../store/selectors/authSelectors';
import axios from 'axios';

export function MyPageMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const handleLoginOutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    const result = confirm('로그아웃 하시겠습니까?');
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
          onClick={() => {
            navigate('/mypage');
          }}
        >
          {user ? `${user.nickname}님` : '미로그인'}
        </StyledProfileInfo>
      </StyledMenuProfile>{' '}
      <div>|</div>
      <StyledMenuItem onClick={handleLoginOutClick}>로그아웃</StyledMenuItem>
    </StyledMenu>
  );
}

const StyledMenu = styled.div`
  display: flex;
  width: 23rem;
  padding: 0.5rem 0;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 2rem;

  & > div:nth-child(2) {
    align-self: center;
    color: #e5e5e5;
    font-weight: bold;
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
`;

const StyledMenuItem = styled.div`
  flex: 2;
  text-align: center;
  cursor: pointer;
  padding-top: 5px;
  color: rgb(62, 84, 99);
  font-size: 10px;
  &:first-child {
    margin-top: 15px;
  }
`;
