import react, { useEffect, useState } from 'react';
import { FormDataType } from '../../../pages/MyPage';
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
      <label>{title}</label>
      <StyledInfoInput
        name={name}
        type={type}
        value={inputValue}
        onChange={handleChange}
        disabled={isDisabled}
      />
      {!noButton && (
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
  width: 100%;
  display: grid;
  justify-content: stretch;
  align-items: center;
  background-color: #f9f9f9;
  grid-template-columns: 8rem 1fr 6rem;
  font-size: 1.2rem;
  border-bottom: 0.4rem solid white;

  & > label {
    display: flex;
    align-items: center;
    justify-content: start;
    height: 5rem;
    padding-left: 1.2rem;
    font-weight: 500;
    background-color: #f9f9f9;
    border-right: 1px solid #e5e5e5;
  }

  & > button {
    justify-self: stretch;
  }

  @media (min-width: 372px) {
    width: 100%;
  }

  @media (min-width: 768px) {
    width: 90%;
    font-size: 1.3rem;
    grid-template-columns: 11.5rem 1fr 10rem;

    & > label {
      height: 5rem;
    }
  }
`;

export const StyledInfoInput = styled.input`
  height: 5rem;
  padding-left: 15px;
  outline: none;
  border: none;
  border-right: 1px solid #e5e5e5;
  @media (min-width: 768px) {
    font-size: 1.4rem;
    height: 5.5rem;
  }
`;

export const StyledButton = styled.button`
  height: 5rem;
  background-color: #f9f9f9;
  @media (min-width: 768px) {
    height: 5.5rem;
  }
`;
