import { AppThunk } from '../../store';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  LOGOUT,
} from './types';
import axios from 'axios';
import { UserDataType } from './types';

const postLoginUrl = `${process.env.REACT_APP_API_URL}/auths/login`;

export const login = (data: {
  user_id: string;
  password: string;
}): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    try {
      const response = await axios.post(postLoginUrl, data, {
        withCredentials: true,
      });
      const userData = response.data.data;
      dispatch(loginSuccess(userData));
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      dispatch(loginFailure(errorMessage));
      console.log(error);
    }
  };
};

const loginSuccess = (userData: UserDataType) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userData,
  };
};

const loginFailure = (errorMessage: string) => {
  return {
    type: LOGIN_FAILURE,
    payload: errorMessage,
  };
};

export const updateUserData = (): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/`,
        {
          withCredentials: true,
        }
      );
      const userData = response.data.data;
      dispatch(updateSuccess(userData));
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      dispatch(updateFailure(errorMessage));
      console.log(error);
    }
  };
};

const updateSuccess = (userData: UserDataType) => {
  return {
    type: UPDATE_SUCCESS,
    payload: userData,
  };
};

const updateFailure = (errorMessage: string) => {
  return {
    type: UPDATE_FAILURE,
    payload: errorMessage,
  };
};

export const logOut = () => {
  return {
    type: LOGOUT,
  };
};
