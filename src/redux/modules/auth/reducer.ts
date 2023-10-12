import { AuthReducerType, initialState } from './types';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  LOGOUT,
} from './types';

const authReducer: AuthReducerType = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogIn: true,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        isLogIn: true,
        user: action.payload,
        error: null,
      };
    case UPDATE_FAILURE:
      return {
        ...state,
        isLogIn: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLogIn: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
