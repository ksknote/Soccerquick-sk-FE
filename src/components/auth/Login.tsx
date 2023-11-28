import { useState, FormEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import alertModal from '../common/alertModal';
import { login } from '../../redux/modules/auth/actions';
import {
  Modal,
  ModalForm,
  ModalInput,
  ModalSubmitButton,
} from '../common/AuthComponents';
import styled from 'styled-components';
import {
  isLoginSelector,
  loginErrorSelector,
} from '../../redux/modules/auth/selector';

// User type
type UserProps = {
  userId: string;
  password: string;
};

// Login  props type
type LoginProps = {
  handleIsLogin: (e: React.MouseEvent<HTMLDivElement>) => void;
};

// Login
function Login({ handleIsLogin }: LoginProps) {
  const [formData, setFormData] = useState<UserProps>({
    userId: '',
    password: '',
  });
  const [loginError, setLoginError] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLogin = useSelector(isLoginSelector);
  const loginErr = useSelector(loginErrorSelector);

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

  const checkUsers = async (data: { user_id: string; password: string }) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (isLogin) {
      navigate('/');
      alertModal('로그인 되었습니다.', 'success');
    } else if (loginErr) {
      setLoginError(loginErr);
    }
    // eslint-disable-next-line
  }, [isLogin, loginErr]);

  return (
    <Modal onClick={handleIsLogin}>
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
