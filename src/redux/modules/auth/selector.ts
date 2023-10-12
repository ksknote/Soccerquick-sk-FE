import { RootState } from '../rootReducer';

// selectors 추출반환 함수
export const authSelector = (state: RootState) => state.auth;
export const userSelector = (state: RootState) => state.auth.user;
export const isLoginSelector = (state: RootState) => state.auth.isLogIn;
export const loginErrorSelector = (state: RootState) => state.auth.error;
