import { Reducer } from 'redux';

export interface ActionType {
  type: string;
  payload: any;
}

export type AuthStateType = {
  isLogIn: boolean;
  user: UserDataType | null;
  error: string | null;
};

export interface UserDataType {
  user_id: string;
  name: string;
  nick_name: string;
  email: string;
  phone_number: string;
  gender: string;
  profile: string;
  role: string;
  applicant_status: string;
  favoritePlaygrounds: string[];
  login_banned: boolean;
  login_banEndDate: Date | null;
  community_banned: boolean;
  community_banEndDate: Date;
  likePosts: string;
  createdAt: string;
}

export const initialState: AuthStateType = {
  isLogIn: false,
  user: null,
  error: null,
};

export type AuthReducerType = Reducer<AuthStateType, ActionType>;

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'UPDATE_FAILURE';
export const LOGOUT = 'LOGOUT';
