import { AppThunk } from '../../store';
import {
  FETCH_COMMUNITY_POST_REQUEST,
  FETCH_COMMUNITY_POST_SUCCESS,
  FETCH_COMMUNITY_POST_FAILURE,
} from './actionType';
import axios from 'axios';

export const fetchCommunityPost = (
  post_id: string | undefined
): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    dispatch(fetchCommunityPostRequest());
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/communities/${post_id}`
      );
      const postData = response.data.data;
      dispatch(fetchCommunityPostSuccess(postData));
      console.log(response);
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      dispatch(fetchCommunityPostFailure(errorMessage));
      console.log(error);
    }
  };
};

export const fetchCommunityPostRequest = () => ({
  type: FETCH_COMMUNITY_POST_REQUEST,
});

export const fetchCommunityPostSuccess = (postData: any) => {
  return {
    type: FETCH_COMMUNITY_POST_SUCCESS,
    payload: postData,
  };
};

export const fetchCommunityPostFailure = (errorMessage: any) => {
  return {
    type: FETCH_COMMUNITY_POST_FAILURE,
    payload: errorMessage,
  };
};
