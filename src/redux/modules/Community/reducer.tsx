import React from 'react';
import {
  StateType,
  CommunityPostReducerType,
  FETCH_COMMUNITY_POST_REQUEST,
  FETCH_COMMUNITY_POST_FAILURE,
  FETCH_COMMUNITY_POST_SUCCESS,
} from './types';

const initialState: StateType = {
  postData: null,
  loading: false,
  error: null,
};

const communityPostReducer: CommunityPostReducerType = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_COMMUNITY_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_COMMUNITY_POST_SUCCESS:
      return {
        ...state,
        postData: action.payload,
        loading: false,
      };
    case FETCH_COMMUNITY_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default communityPostReducer;
