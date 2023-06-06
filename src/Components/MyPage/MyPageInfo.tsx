import react, { useState, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import styled from 'styled-components';
import { FormData } from '../../Pages/MyPage';
import MyPageInput from './MyPageInput';
import { checkNewPassword } from './checkPassword';

type MyPageInfoProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

export type ErrorMsg = {
  formMsg: string;
  passwordFormMsg: string;
};

export type PasswordForm = {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export function MyPageInfo({ formData, setFormData }: MyPageInfoProps) {
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    oldPassword: '12341234a',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const [errorMsg, setErrorMsg] = useState<ErrorMsg>({
    formMsg: '',
    passwordFormMsg: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { oldPassword, newPassword, newPasswordConfirm } = passwordForm;
    if (newPassword.length > 0) {
      const check = await checkNewPassword(
        newPassword,
        newPasswordConfirm,
        setErrorMsg
      );
      if (!check) {
        return;
      }
    }

    try {
      const response = await axios.patch(
        'http://localhost:8800/user',
        {
          user_id: formData.user_id,
          name: formData.name,
          password: newPassword ? newPassword : oldPassword,
          nick_name: formData.nick_name,
          email: formData.email,
          phone_number: formData.phone_number,
          gender: formData.gender,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      alert('회원정보가 변경되었습니다.');
      console.log(response.data);
      setErrorMsg({
        formMsg: '',
        passwordFormMsg: '',
      });
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        const responseData = axiosError.response?.data as { message?: string };
        console.log(responseData.message);
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
            value={formData.user_id}
            setFormData={setFormData}
          />
          <MyPageInput
            title="이름"
            name="name"
            value={formData.name}
            setFormData={setFormData}
          />
          <MyPageInput
            title="닉네임"
            name="nick_name"
            value={formData.nick_name}
            setFormData={setFormData}
          />
          <MyPageInput
            title="이메일"
            name="email"
            value={formData.email}
            setFormData={setFormData}
          />
          <MyPageInput
            title="전화번호"
            name="phone_number"
            value={formData.phone_number}
            setFormData={setFormData}
          />
          <MyPageInput
            title="성별"
            name="gender"
            value={formData.gender}
            setFormData={setFormData}
          />
          <StyledSubmitButton>변경</StyledSubmitButton>
        </StyledInfoForm>
        <div style={{ color: 'red', marginTop: '1rem' }}>
          {errorMsg.formMsg}
        </div>
      </StyledInfoBox>
      <StyledInfoBox>
        {' '}
        <StyledTitle>비밀번호 변경</StyledTitle>
        <StyledInfoForm onSubmit={handleSubmit}>
          <MyPageInput
            title="기존 비밀번호"
            name="oldPassword"
            value={passwordForm.oldPassword}
            setPasswordForm={setPasswordForm}
          />
          <MyPageInput
            title="새 비밀번호"
            name="newPassword"
            value={passwordForm.newPassword}
            setPasswordForm={setPasswordForm}
          />
          <MyPageInput
            title="새 비밀번호 확인"
            name="newPasswordConfirm"
            value={passwordForm.newPasswordConfirm}
            setPasswordForm={setPasswordForm}
          />
          <StyledSubmitButton>변경</StyledSubmitButton>
        </StyledInfoForm>
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          {errorMsg.passwordFormMsg}
        </div>
      </StyledInfoBox>
    </StyledInfoContainer>
  );
}

const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  & > div:last-child {
    height: 43rem;
    margin-bottom: 2.5rem;
  }
`;

const StyledInfoBox = styled.div`
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

const StyledTitle = styled.div`
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
`;

const StyledSubmitButton = styled.button`
  align-self: end;
  width: 8rem;
  margin: 1rem 1rem 0 0;
  font-size: 1rem;
  background-color: #09cf00;
  color: #fff;
`;
