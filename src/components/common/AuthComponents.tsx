import styled from 'styled-components';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// Modal
export function Modal(props: {
  children: React.ReactNode;
  long?: boolean;
  register?: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const navigate = useNavigate();

  return (
    <ModalBox long={props.long}>
      <Logo
        src="/Images/soccerquick.png"
        alt="logo"
        onClick={() => navigate('/')}
      />
      {props.children}
      <BottomLine />
      <ModalTextBox>
        {props.register ? (
          <>
            이미 회원이신가요?<div onClick={props.onClick}>로그인 하기</div>
          </>
        ) : (
          <>
            아직 아이디가 없으신가요?
            <div onClick={props.onClick}>회원가입 하기</div>
          </>
        )}
      </ModalTextBox>
    </ModalBox>
  );
}

// form props type
type FormProps = {
  children: React.ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

// ModalForm
export function ModalForm({ children, onSubmit }: FormProps) {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
}

// input props type
type InputProps = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  radius?: string;
  text?: string;
  message?: string;
  check?: boolean;
};

// ModalInput
export function ModalInput({
  name,
  type,
  placeholder,
  value,
  onChange,
  text,
  message,
  radius,
  check,
}: InputProps) {
  let radiusString = '';
  if (radius === 'top') {
    radiusString = '8px 8px 0px 0px';
  } else if (radius === 'bottom') {
    radiusString = '0px 0px 8px 8px';
  } else if (radius === 'top-left') {
    radiusString = '8px 0px 0px 0px';
  } else if (radius === 'none') {
    radiusString = '0px';
  } else {
    radiusString = '';
  }
  return (
    <InputBox check={check} text={text}>
      <InputText text={text}>{text}</InputText>
      <InputBar>
        <StyledInput
          radius={radiusString}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </InputBar>
      <span>{message}</span>
    </InputBox>
  );
}

// ModalSubmitButton
export function ModalSubmitButton(props: any) {
  const { children, term } = props;
  return (
    <StyledSubmitButton type="submit" disabled={!term} term={term}>
      {children}
    </StyledSubmitButton>
  );
}

// ModalButton props type
type ButtonProps = {
  children: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void | null;
};

// ModalButton
export function ModalButton({ children, onClick }: ButtonProps) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

// ModalSelectBox options, props type
type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

// select
export function ModalSelectBox({ options, value, onChange }: SelectProps) {
  return (
    <StyledSelect value={value} onChange={onChange}>
      <option value="" disabled hidden>
        성별
      </option>
      {options.map((option, idx) => (
        <option key={`gender-${idx}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

// ModalTerms
export function ModalTerms(props: {
  children: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  term: boolean;
}) {
  return (
    <TermBox onClick={props.onClick} term={props.term}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {props.term ? (
          <rect width="20" height="20" rx="10" fill="#727f88" />
        ) : (
          <rect width="20" height="20" rx="10" fill="#D9D9D9" />
        )}
        <path d="M5 8.84211L9.24242 14L15 7" stroke="white" />
      </svg>
      <span>{props.children}</span>
    </TermBox>
  );
}

// styled-components
// Modal
const ModalBox = styled.div<{ long?: boolean }>`
  width: 90%;
  max-width: 50rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 115px;
  height: 60px;
  margin-bottom: 15px;
`;

const BottomLine = styled.div`
  width: 70%;
  border: 0.5px solid #e3e5e8;
  margin-top: 25px;
`;

const ModalTextBox = styled.div`
  display: flex;
  justify-contents: center;
  align-items: center;
  margin: 15px 0;

  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: #898f9c;

  & > div {
    font-weight: 400;
    line-height: 17px;
    text-decoration: underline;
    margin-left: 10px;
    color: #09cf00;
  }
  & > div:hover {
    cursor: pointer;
  }
  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

// ModalForm
const StyledForm = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// ModalInput
const InputBox = styled.div<{ check?: boolean; text?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${(props) => (props.text ? '60px' : '45px')};
  margin-top: ${(props) => (props.text ? '20px' : '0')};
  & > span {
    position: absolute;
    right: 1rem;
    margin-top: 15px;
    color: ${(props) => (props.check ? 'blue' : 'red')};
  }
`;

const InputText = styled.div<{ text?: string }>`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  padding-left: 10px;
  padding-bottom: ${(props) => (props.text ? '5px' : '0')};
  color: #727f88;
`;

const InputBar = styled.div`
  postition: absolute;
  width: 100%;
  height: 45px;
  border-color: #e3e5e8;
`;

const StyledInput = styled.input<{ radius?: string }>`
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 1px solid #e3e5e8;
  padding-left: 15px;

  border-radius: ${(props) => props.radius || '8px'};
  color: black;

  ::placeholder {
    color: #eeeeee;
  }
`;

//  ModalButton
const StyledButton = styled.button`
  width: 100%;
  height: 45px;
  background: #09cf00;
  border-radius: 8px;
  color: #fff;
  margin-top: 20px;
`;
//ModalSubmitButton,
const StyledSubmitButton = styled.button<{ term: boolean }>`
  width: 100%;
  height: 45px;
  background: ${({ term }) => (term ? '#09cf00' : 'lightgray')};
  border-radius: 8px;
  color: #fff;
  margin-top: 20px;
`;

// ModalSelect
const StyledSelect = styled.select`
  outline: none;
  width: 100%;
  height: 49px;
  text-align: center;
  background: #ffffff;
  color: #727f88;
  border: 1px solid #e3e5e8;
  border-radius: 0px 0px 8px 8px;
  margin-bottom: 5px;

  &:focus {
    border: 1px solid #727f88;
  }
`;

// ModalTerms
const TermBox = styled.div<{ term: boolean }>`
  display: flex;
  justify-contents: flex;
  align-self: center;
  margin-top: 25px;
  align-items: center;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 17px;
  color: ${(props) => (props.term ? ' #727f88' : '#eeeeee')};

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* 인터넷익스플로러 */
  user-select: none;

  & > span {
    margin-left: 10px;
  }
`;
