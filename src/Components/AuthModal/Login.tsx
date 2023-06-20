import { useState, FormEvent } from 'react';
import { AUTH_ACTIONS } from '../../ReduxStore/modules/Auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  Modal,
  ModalForm,
  ModalInput,
  ModalSubmitButton,
} from '../Commons/AuthComponents';
import axios from 'axios';
import styled from 'styled-components';

const postLoginUrl = `${process.env.REACT_APP_API_URL}/auths/login`;

// User type
type UserProps = {
  userId: string;
  password: string;
};

// Login  props type
type LoginProps = {
  handleIsLogin: (e: React.MouseEvent<HTMLDivElement>) => void;
  setAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
};

// Login
function Login({ handleIsLogin, setAuthModal }: LoginProps) {
  const [formData, setFormData] = useState<UserProps>({
    userId: '',
    password: '',
  });
  const [loginError, setLoginError] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setLoginError('');
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      user_id: formData.userId,
      password: formData.password,
    };

    if (!data.user_id) {
      setLoginError('아이디를 입력해주세요.');
      return;
    } else if (!data.password) {
      setLoginError('비밀번호를 입력해주세요.');
      return;
    }

    checkUsers(data);
  };

  const checkUsers = (data: { user_id: string; password: string }) => {
    axios
      .post(postLoginUrl, data, { withCredentials: true })
      .then((res) => {
        return res.data.data;
      })
      .then((userData) => {
        const user = {
          user_id: userData.user_id,
          name: userData.name,
          nickname: userData.nick_name,
          profile: userData.profile,
          role: userData.role,
          applicant_status: userData.applicant_status,
        };

        dispatch(
          AUTH_ACTIONS.login({
            user,
          })
        );
        setLoginError('');
        setAuthModal(false);

        navigate(currentPath, { replace: true });
      })
      .catch((err) => {
        setLoginError('존재하지 않는 계정입니다.');
      });
  };

  return (
    <Modal onClick={handleIsLogin} setAuthModal={setAuthModal}>
      <ModalForm onSubmit={handleSubmit}>
        <ModalInput
          text="아이디"
          name="userId"
          type="text"
          placeholder="아이디를 입력해주세요."
          value={formData.userId}
          onChange={handleFormChange}
        />

        <ModalInput
          text="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={formData.password}
          onChange={handleFormChange}
        />

        {<LoginError>{loginError}</LoginError>}
        <ModalSubmitButton
          term={
            formData.userId.length > 0 && formData.password.length > 0
              ? true
              : false
          }
        >
          로그인
        </ModalSubmitButton>
      </ModalForm>
    </Modal>
  );
}

export default Login;

const LoginError = styled.div`
  height: 1.3rem;
  align-self: start;
  font-size: 12px;
  line-height: 16px;
  margin-top: 16px;
  padding-left: 5px;
  color: red;
`;
