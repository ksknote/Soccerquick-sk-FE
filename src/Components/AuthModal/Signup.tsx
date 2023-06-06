import axios from 'axios';
import { useState, useEffect, FormEvent } from 'react';
import styled from 'styled-components';
import {
  Modal,
  ModalForm,
  ModalInput,
  ModalSubmitButton,
  ModalButton,
  ModalSelectBox,
  ModalTerms,
} from '../Commons/AuthComponents';

const postSignupUrl = `${process.env.PUBLIC_URL}/auth/signup`; // signup api url
const postIdCheckUrl = 'http://localhost:8800/auth/id'; // id-check api url

// Signup type
type SignupProps = {
  handleIsLogin: (e: React.MouseEvent<HTMLDivElement>) => void;
  setAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
};

// Signup form type
type SignupFormProps = {
  user_id: string;
  password: string;
  name: string;
  nick_name: string;
  email: string;
  phone_number: string;
  gender: string;
};

function Signup({ handleIsLogin, setAuthModal }: SignupProps) {
  const [formData, setFormData] = useState<SignupFormProps>({
    user_id: '',
    password: '',
    name: '',
    nick_name: '',
    email: '',
    phone_number: '',
    gender: '',
  });

  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [termCheck, setTermCheck] = useState<boolean>(false);

  const [checkUserId, setCheckUserId] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<boolean>(false);

  const [userIdMsg, setUserIdMsg] = useState<string>('');
  const [passwordMsg, setPasswordMsg] = useState<string>('');
  const [responseMsg, setResponseMsg] = useState<string>('');

  useEffect(() => {
    if (!password || !passwordConfirm) {
      setPasswordMsg('');
    } else if (password === passwordConfirm) {
      setPasswordMsg('비밀번호가 일치합니다!');
      setCheckPassword(true);
    } else {
      setPasswordMsg('비밀번호가 일치하지 않습니다!');
      setCheckPassword(false);
    }
  }, [password, passwordConfirm]);

  useEffect(() => {
    if (userIdMsg.includes('사')) {
      setCheckUserId(true);
    } else {
      setCheckUserId(false);
    }
  }, [userIdMsg]);

  useEffect(() => {
    axios
      .post(postSignupUrl, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.statusCode === 400) {
          setResponseMsg(data.message);
        } else {
          alert(data.message);
          setAuthModal(false);
        }
      })
      .catch((error) => {
        setResponseMsg(error.response.data.message);
      });
  }, [formData]);

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserId(e.target.value);
    setUserIdMsg('');
  };

  const handleUserIdCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post(`${postIdCheckUrl}`, { user_id: userId })
      .then((res) => res.data)
      .then((result) => {
        setUserIdMsg(() => result.message);
      })
      .catch((err) => console.log(err));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPasswordConfirm(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNickname(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPhonenumber(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setGender(e.target.value);
  };

  const handleTermCheck = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (termCheck) {
      setTermCheck(false);
    } else {
      setTermCheck(true);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkUserId) {
      setResponseMsg('아이디 입력 후 중복 체크를 진행해주세요.');
      return;
    } else if (!checkPassword) {
      setResponseMsg('비밀번호와 비밀번호 확인을 동일하게 입력해주세요.');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      user_id: userId,
      password: password,
      name: name,
      nick_name: nickname,
      email: email,
      phone_number: phonenumber,
      gender: gender,
    }));
  };

  return (
    <Modal long register onClick={handleIsLogin} setAuthModal={setAuthModal}>
      <ModalForm onSubmit={handleSubmit}>
        <ModalFormTop>
          <EmailCheck>
            <ModalInput
              radius="top-left"
              name="userId"
              type="text"
              placeholder="아이디"
              value={userId}
              onChange={handleUserIdChange}
              message={userIdMsg}
              check={checkUserId}
            />
            <ModalButton onClick={handleUserIdCheck}>
              {checkUserId ? '✔' : '중복확인'}
            </ModalButton>
          </EmailCheck>
          <ModalInput
            radius="none"
            name="password"
            type="password"
            placeholder="비밀번호 (8자이상, 숫자/영소문자 포함)"
            value={password}
            onChange={handlePasswordChange}
          />
          <ModalInput
            radius="bottom"
            name="passwordCheck"
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={handlePasswordCheck}
            message={passwordMsg}
            check={checkPassword}
          />
        </ModalFormTop>
        <ResponseText>{responseMsg}</ResponseText>
        <ModalFormBottom>
          <ModalInput
            radius="top"
            name="name"
            type="text"
            placeholder="이름"
            value={name}
            onChange={handleNameChange}
          />
          <ModalInput
            radius="none"
            name="nickname"
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={handleNicknameChange}
          />
          <ModalInput
            radius="none"
            name="email"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={handleEmailChange}
          />
          <ModalInput
            radius="none"
            name="phonenumber"
            type="tel"
            placeholder="핸드폰 번호"
            value={phonenumber}
            onChange={handlePhoneNumberChange}
          />
          <ModalSelectBox
            value={gender}
            onChange={handleGenderChange}
            options={[
              { value: '남', label: '남' },
              { value: '여', label: '여' },
            ]}
          />
        </ModalFormBottom>

        <ModalTerms onClick={handleTermCheck} term={termCheck}>
          싸커퀵 서비스 이용 약관 및 개인 정보 수집 및 이용에 동의합니다.
        </ModalTerms>
        <RegisterText>
          회원가입 시 <span>매치 찜하기</span> 기능과{' '}
          <span>싸커퀵 커뮤니티</span>를 이용할 수 있어요.
        </RegisterText>
        <ModalSubmitButton>회원가입</ModalSubmitButton>
      </ModalForm>
    </Modal>
  );
}

export default Signup;

// styled-components
const ModalFormTop = styled.div`
  margin-bottom: 10px;
`;

const ModalFormBottom = styled.div`
  margin-top: 10px;
`;

const EmailCheck = styled.div`
  display: flex;
  flex-direction: columns;
  width: 380px;

  & input {
    flex: 3;
  }

  & button {
    flex: 1;
    margin: 0;
    align-self: flex-end;
    min-width: 90px;
    border-radius: 0px 8px 0px 0px;
  }
`;

const RegisterText = styled.div`
  align-self: center;
  margin-top: 20px;
  color: #898f9c;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 17px;
  & > span {
    color: #09cf00;
  }
`;

const ResponseText = styled.div`
  color: red;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 17px;
`;
