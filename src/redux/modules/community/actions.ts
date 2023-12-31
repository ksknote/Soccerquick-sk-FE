import { AppThunk } from '../../store';
import {
  FETCH_COMMUNITY_POST_REQUEST,
  FETCH_COMMUNITY_POST_SUCCESS,
  FETCH_COMMUNITY_POST_FAILURE,
  FETCH_COMMUNITY_HOT_POST_REQUEST,
  FETCH_COMMUNITY_HOT_POST_SUCCESS,
  FETCH_COMMUNITY_HOT_POST_FAILURE,
} from './types';
import { PostWithCommentsType } from '../../../types/CommunityType';
import axios from 'axios';

export const fetchCommunityPost = (
  post_id: string | undefined
): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    dispatch(fetchCommunityPostRequest());
    try {
      if (!post_id) throw new Error('포스트를 찾을 수 없습니다.');
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/communities/${post_id}`
      );
      const postData = response.data.data;
      dispatch(fetchCommunityPostSuccess(post_id, postData));
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

export const fetchCommunityPostSuccess = (
  post_id: string,
  postData: PostWithCommentsType
) => {
  return {
    type: FETCH_COMMUNITY_POST_SUCCESS,
    payload: { post_id, postData },
  };
};

export const fetchCommunityPostFailure = (errorMessage: string) => {
  return {
    type: FETCH_COMMUNITY_POST_FAILURE,
    payload: errorMessage,
  };
};

export const fetchCommunityHotPost = (): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    dispatch(fetchCommunityHotPostRequest());
    try {
      const url = `${process.env.REACT_APP_API_URL}/communities?keyword=null&sort=Comment&page=1&itemsPerPage=5`;
      const config = {
        withCredentials: true,
      };
      const response = await axios.get(url, config);
      const postData = response.data.data;
      dispatch(fetchCommunityHotPostSuccess(postData));
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      dispatch(fetchCommunityHotPostFailure(errorMessage));
      console.log(error);
    }
  };
};

export const fetchCommunityHotPostRequest = () => ({
  type: FETCH_COMMUNITY_HOT_POST_REQUEST,
});

export const fetchCommunityHotPostSuccess = (
  postData: PostWithCommentsType
) => {
  return {
    type: FETCH_COMMUNITY_HOT_POST_SUCCESS,
    payload: { postData },
  };
};

export const fetchCommunityHotPostFailure = (errorMessage: string) => {
  return {
    type: FETCH_COMMUNITY_HOT_POST_FAILURE,
    payload: errorMessage,
  };
};
