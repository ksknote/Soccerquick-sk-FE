import { RootState } from '../reducers';

// selectors 추출반환 함수
export const userSelector = (state: RootState) => state.auth.user;
export const isLogInSelector = (state: RootState) => state.auth.isLogIn;
