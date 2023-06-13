import react, { useState, FormEvent, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import styled from 'styled-components';
import { FormDataType } from '../../../Pages/MyPage';
import { MyPageInput } from './MyPageInput';
import { checkNewPassword } from '../checkPassword';
import { useNavigate } from 'react-router-dom';
import { AUTH_ACTIONS } from '../../../store/reducers/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../../store/selectors/authSelectors';

type MyPageInfoProps = {
  userData: FormDataType;
  setUserData: React.Dispatch<React.SetStateAction<FormDataType>>;
  oldPassword: string;
  selectedImage: File | undefined;
};

export type ErrorMsg = {
  formMsg: string;
  passwordFormMsg: string;
};

export type PasswordForm = {
  newPassword: string;
  newPasswordConfirm: string;
};

export function MyPageInfo({
  userData,
  setUserData,
  oldPassword,
  selectedImage,
}: MyPageInfoProps) {
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    newPassword: '',
    newPasswordConfirm: '',
  });
  const [errorMsg, setErrorMsg] = useState<ErrorMsg>({
    formMsg: '',
    passwordFormMsg: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(userSelector);

  useEffect(() => {
    if (!userInfo) {
      alert('마이페이지는 로그인 후 사용해주세요.');
      navigate('/');
    }
  }, [userInfo]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { newPassword, newPasswordConfirm } = passwordForm;
    if (newPassword.length > 0) {
      const check = await checkNewPassword(
        oldPassword,
        newPassword,
        newPasswordConfirm,
        setErrorMsg
      );
      if (!check) {
        return;
      }
    }

    // eslint-disable-next-line no-restricted-globals
    const result = confirm('정보를 수정 하시겠습니까?');
    if (result) {
      handleMyInfoChangeConfirm(newPassword, oldPassword);
    }
  };

  const handleMyInfoChangeConfirm = async (
    newPassword: string,
    oldPassword: string
  ) => {
    try {
      const formData = new FormData();
      formData.append('user_id', userData.user_id);
      formData.append('name', userData.name);
      formData.append('nick_name', userData.nick_name);
      formData.append('email', userData.email);
      formData.append('phone_number', userData.phone_number);
      formData.append('gender', userData.gender);
      if (newPassword) {
        formData.append('password', newPassword);
      } else {
        formData.append('password', oldPassword);
      }
      if (selectedImage) {
        formData.append('image', selectedImage);
      } else {
        formData.append('image', userData.profile);
      }

      const url = `${process.env.REACT_APP_API_URL}/users`;
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      };

      const response = await axios.patch(url, formData, config);
      alert(response.data.message);

      if (selectedImage && userInfo) {
        const userProfile = URL.createObjectURL(selectedImage);

        const user = {
          user_id: userInfo.user_id,
          name: userInfo.name,
          nickname: userInfo.nickname,
          profile: userProfile,
          role: userInfo.role,
        };
        dispatch(AUTH_ACTIONS.updateUser({ user }));
      }

      setErrorMsg({
        formMsg: '',
        passwordFormMsg: '',
      });

      setPasswordForm((prev) => ({
        ...prev,
        newPassword: '',
        newPasswordConfirm: '',
      }));
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        const responseData = axiosError.response?.data as { message?: string };
        setErrorMsg({
          formMsg: String(responseData.message),
          passwordFormMsg: '',
        });
      } else {
        setErrorMsg({
          formMsg: '오류가 발생했습니다.',
          passwordFormMsg: '',
        });
      }
    }
  };

  const handleWithDrawalClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    const result = confirm('정말 탈퇴 하시겠습니까?');
    if (result) {
      handleAlertWithDrawalConfirm(oldPassword);
    }
  };

  const handleAlertWithDrawalConfirm = async (oldPassword: String) => {
    dispatch(AUTH_ACTIONS.logout());
    const headers = {
      withCredentials: true,
    };

    const uri = `${process.env.REACT_APP_API_URL}/users`;

    await axios
      .delete(uri, {
        data: { password: oldPassword },
        withCredentials: headers.withCredentials,
      })
      .then(() => {
        alert('탈퇴 되었습니다.');
        navigate('/', { replace: true });
      })
      .catch((e) => console.log(e));
  };

  return (
    <StyledInfoContainer>
      {' '}
      <StyledInfoBox>
        {' '}
        <StyledTitle>내 정보</StyledTitle>
        <StyledInfoForm onSubmit={handleSubmit}>
          <MyPageInput
            title="아이디"
            name="user_id"
            value={userData.user_id}
            noButton
          />
          <MyPageInput
            title="이름"
            name="name"
            value={userData.name}
            noButton
          />
          <MyPageInput
            title="닉네임"
            name="nick_name"
            value={userData.nick_name}
            setFormData={setUserData}
          />
          <MyPageInput
            title="이메일"
            name="email"
            value={userData.email}
            setFormData={setUserData}
          />
          <MyPageInput
            title="전화번호"
            name="phone_number"
            value={userData.phone_number}
            setFormData={setUserData}
          />
          <MyPageInput
            title="성별"
            name="gender"
            value={userData.gender}
            noButton
          />
          <div>
            {' '}
            <StyledSubmitButton>변경</StyledSubmitButton>
            <StyledRedSubmitButton onClick={handleWithDrawalClick}>
              회원 탈퇴
            </StyledRedSubmitButton>
          </div>
        </StyledInfoForm>
        <StyledErrorDiv>{errorMsg.formMsg}</StyledErrorDiv>
      </StyledInfoBox>
      <StyledInfoBox>
        {' '}
        <StyledTitle>비밀번호 변경</StyledTitle>
        <StyledShortInfoForm onSubmit={handleSubmit}>
          <MyPageInput
            title="새 비밀번호"
            name="newPassword"
            type="password"
            value={passwordForm.newPassword}
            setPasswordForm={setPasswordForm}
          />
          <MyPageInput
            title="새 비밀번호 확인"
            name="newPasswordConfirm"
            type="password"
            value={passwordForm.newPasswordConfirm}
            setPasswordForm={setPasswordForm}
          />
          <StyledSubmitButton>변경</StyledSubmitButton>
        </StyledShortInfoForm>
        <StyledErrorDiv>{errorMsg.passwordFormMsg}</StyledErrorDiv>
      </StyledInfoBox>
    </StyledInfoContainer>
  );
}

export const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  & > div:last-child {
    height: 43rem;
    margin-bottom: 2.5rem;
  }
`;

export const StyledInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 60rem;
  background: rgb(253, 253, 253);
  border-radius: 16px;
  margin-top: 2.5rem;
`;

export const StyledTitle = styled.div`
  align-self: flex-start;
  font-size: 2.5rem;
  font-weight: bold;
  margin: 2rem 0 2rem 5rem;
  width: 50rem;
  border-bottom: 3px solid #e5e5e5;
`;

const StyledInfoForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;
  height: 70%;

  & > div:last-child {
    align-self: end;
  }
`;

const StyledSubmitButton = styled.button`
  align-self: end;
  width: 8rem;
  margin: 1rem 1rem 0 0;
  font-size: 1rem;
  background-color: #09cf00;
  color: #fff;
  border-radius: 0.5rem;
`;

const StyledRedSubmitButton = styled(StyledSubmitButton)`
  background-color: #ec5d5e;
`;

const StyledErrorDiv = styled.div`
  color: red;
  margin: 0.5rem 0;
`;

const StyledShortInfoForm = styled(StyledInfoForm)`
  height: 14rem;
`;
