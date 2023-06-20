import react, { useState } from 'react';
import { StyledInfoContainer, StyledInfoBox, StyledTitle } from './MyPageInfo';
import { StyledInputBox, StyledInfoInput, StyledButton } from './MyPageInput';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../ReduxStore/modules/Auth/authSelectors';
import styled from 'styled-components';

type MyPageCheckPasswordProps = {
  setCheckPassword: React.Dispatch<React.SetStateAction<boolean>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

function MyPageCheckPassword({
  setCheckPassword,
  password,
  setPassword,
}: MyPageCheckPasswordProps) {
  const [errorMsg, setErrorMsg] = useState('');
  const user = useSelector(userSelector);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
    setErrorMsg('');
  };

  const handlePasswordCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      user_id: user?.user_id,
      password: password,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auths/password`, data, {
        withCredentials: true,
      })
      .then((res) => res.request)
      .then((result) => {
        if (result.status === 200) {
          setCheckPassword(true);
        }
      })
      .catch((err) => {
        if (user) {
          setErrorMsg(err.response.data.message);
        } else {
          setErrorMsg('로그인을 먼저 진행해주세요.');
        }
      });
  };

  return (
    <StyledInfoContainer>
      <StyledShortInfoBox>
        <StyledMarginTopTitle>내 정보 확인</StyledMarginTopTitle>
        <StyledMarginBottomInputBox>
          <label>비밀번호 확인</label>
          <StyledInfoInput
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
          <StyledButton onClick={handlePasswordCheck}>확인</StyledButton>
        </StyledMarginBottomInputBox>
        <div>{errorMsg}</div>
      </StyledShortInfoBox>
    </StyledInfoContainer>
  );
}

export default MyPageCheckPassword;

const StyledShortInfoBox = styled(StyledInfoBox)`
  height: 20rem !important;
  & > div:last-child {
    height: 5rem;
    color: red;
    padding-top: 1rem;
  }
`;

const StyledMarginTopTitle = styled(StyledTitle)`
  margin-top: 3rem !important;
`;

const StyledMarginBottomInputBox = styled(StyledInputBox)`
  height: 6rem;
`;
