import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  isLogIn: boolean;
  user: User | null;
};

export type User = {
  user_id: string;
  name: string;
  nickname: string;
  role: string;
  profile: string;
  applicant_status: string;
};

const initialState: AuthState = {
  isLogIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auths',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User }>) => {
      state.isLogIn = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isLogIn = false;
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
    },
  },
});

// actions 생성함수
export const AUTH_ACTIONS = {
  login: authSlice.actions.login,
  logout: authSlice.actions.logout,
  updateUser: authSlice.actions.updateUser,
};

export default authSlice.reducer;
