import react, { useEffect, useState } from 'react';
import { FormData } from '../../Pages/MyPage';
import styled from 'styled-components';
import { PasswordForm } from './MyPageInfo';

type MyPageInputProps = {
  title: string;
  name: string;
  value: string;
  setFormData?: React.Dispatch<React.SetStateAction<FormData>>;
  setPasswordForm?: React.Dispatch<React.SetStateAction<PasswordForm>>;
};

function MyPageInput({
  title,
  name,
  value,
  setFormData,
  setPasswordForm,
}: MyPageInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(() => {
    if (setFormData) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleChangeButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDisabled(false);
  };

  const handleCompleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    setFormData &&
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
  };

  const handlePasswordCompleteClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsDisabled(true);
    setPasswordForm &&
      setPasswordForm((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
  };

  return (
    <StyledInputBox>
      {' '}
      <label>{title}</label>
      <StyledInfoInput
        name={name}
        value={inputValue}
        onChange={handleChange}
        disabled={isDisabled}
      />
      {isDisabled ? (
        <StyledButton onClick={handleChangeButton}>수정</StyledButton>
      ) : (
        <StyledButton
          onClick={
            setFormData ? handleCompleteClick : handlePasswordCompleteClick
          }
        >
          확인
        </StyledButton>
      )}
    </StyledInputBox>
  );
}

export default MyPageInput;

const StyledInputBox = styled.div`
  display: flex;
  justify-content: stretch;
  height: 100%;
  width: 50rem;

  & > label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10rem;
    height: 5.5rem;
    font-weight: bold;
    background-color: #f9f9f9;
    border-right: 1px solid #e5e5e5;
  }

  & > button {
    justify-self: stretch;
  }
`;

const StyledInfoInput = styled.input`
  width: 30rem;
  height: 5.5rem;
  padding-left: 15px;
  outline: none;
  border: none;
  font-size: 1.6rem;
  border-right: 1px solid #e5e5e5;
}
`;

const StyledButton = styled.button`
  width: 10rem;
  height: 5.5rem;
  font-size: 1rem;
  background-color: #f9f9f9;
`;
