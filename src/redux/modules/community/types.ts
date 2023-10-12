import React from 'react';
import { PostWithCommentsType } from '../../../types/CommunityType';
import { Reducer } from 'redux';

export interface ActionType {
  type: string;
  payload: any;
}

export interface CommunityPostStateType {
  post_id: string;
  postData: PostWithCommentsType | null;
  loading: boolean;
  error: string | null;
}

export type CommunityPostReducerType = Reducer<
  CommunityPostStateType,
  ActionType
>;

export const FETCH_COMMUNITY_POST_REQUEST = 'FETCH_COMMUNITY_POST_REQUEST';
export const FETCH_COMMUNITY_POST_SUCCESS = 'FETCH_COMMUNITY_POST_SUCCESS';
export const FETCH_COMMUNITY_POST_FAILURE = 'FETCH_COMMUNITY_POST_FAILURE';

export const FETCH_COMMUNITY_HOT_POST_REQUEST =
  'FETCH_COMMUNITY_HOT_POST_REQUEST';
export const FETCH_COMMUNITY_HOT_POST_SUCCESS =
  'FETCH_COMMUNITY_HOT_POST_SUCCESS';
export const FETCH_COMMUNITY_HOT_POST_FAILURE =
  'FETCH_COMMUNITY_HOT_POST_FAILURE';
