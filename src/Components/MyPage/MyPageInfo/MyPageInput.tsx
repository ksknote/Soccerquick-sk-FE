import react, { useEffect, useState } from 'react';
import { FormDataType } from '../../../Pages/MyPage';
import styled from 'styled-components';
import { PasswordForm } from './MyPageInfo';

type MyPageInputProps = {
  title: string;
  name: string;
  type?: string;
  value: string;
  noButton?: boolean;
  setFormData?: React.Dispatch<React.SetStateAction<FormDataType>>;
  setPasswordForm?: React.Dispatch<React.SetStateAction<PasswordForm>>;
};

export function MyPageInput({
  title,
  name,
  type,
  value,
  noButton,
  setFormData,
  setPasswordForm,
}: MyPageInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(() => {
    if (noButton) {
      return true;
    }
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
        type={type}
        value={inputValue}
        onChange={handleChange}
        disabled={isDisabled}
      />
      {noButton ? (
        ''
      ) : (
        <>
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
        </>
      )}
    </StyledInputBox>
  );
}

export const StyledInputBox = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;
  height: 100%;
  width: 50rem;
  background-color: #f9f9f9;

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

export const StyledInfoInput = styled.input`
  width: 30rem;
  height: 5.5rem;
  padding-left: 15px;
  outline: none;
  border: none;
  font-size: 1.6rem;
  border-right: 1px solid #e5e5e5;
}
`;

export const StyledButton = styled.button`
  width: 10rem;
  height: 5.5rem;
  font-size: 1rem;
  background-color: #f9f9f9;
`;
