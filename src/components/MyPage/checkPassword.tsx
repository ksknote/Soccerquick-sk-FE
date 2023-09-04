import { ErrorMsg } from './MyPageInfo/MyPageInfo';

export async function checkNewPassword(
  oldPassword: String,
  password: String,
  passwordConfirm: String,
  setErrorMsg: React.Dispatch<React.SetStateAction<ErrorMsg>>
) {
  if (passwordConfirm.length < 0) {
    setErrorMsg((prev) => ({
      ...prev,
      passwordFormMsg: '새 비밀번호 확인을 입력해주세요',
    }));
    return false;
  }

  if (password !== passwordConfirm) {
    setErrorMsg((prev) => ({
      ...prev,
      passwordFormMsg: '새 비밀번호가 일치하지 않습니다.',
    }));
    return false;
  } else if (password === oldPassword) {
    setErrorMsg((prev) => ({
      ...prev,
      passwordFormMsg: '기존 비밀번호와 일치합니다.',
    }));
    return false;
  } else {
    setErrorMsg((prev) => ({
      ...prev,
      passwordFormMsg: '새 비밀번호 일치합니다!',
    }));
    return true;
  }
}
