import React from 'react';
import {
  CommunityPostStateType,
  CommunityPostReducerType,
  FETCH_COMMUNITY_POST_REQUEST,
  FETCH_COMMUNITY_POST_FAILURE,
  FETCH_COMMUNITY_POST_SUCCESS,
} from './types';

const initialState: CommunityPostStateType = {
  post_id: '',
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
        post_id: action.payload.post_id,
        postData: action.payload.postData,
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
