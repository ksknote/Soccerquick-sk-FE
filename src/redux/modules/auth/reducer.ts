import { AuthReducerType, initialState } from './types';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, UDATE } from './types';

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
