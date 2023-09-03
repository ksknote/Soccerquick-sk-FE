import React from 'react';
import { PostWithCommentsType } from '../../../Types/CommunityType';
import { Reducer } from 'redux';

export interface ActionType {
  type: string;
  payload: any;
}

export interface StateType {
  postData: PostWithCommentsType | null;
  loading: boolean;
  error: string | null;
}

export type CommunityPostReducerType = Reducer<StateType, ActionType>;

export const FETCH_COMMUNITY_POST_REQUEST = 'FETCH_COMMUNITY_POST_REQUEST';
export const FETCH_COMMUNITY_POST_SUCCESS = 'FETCH_COMMUNITY_POST_SUCCESS';
export const FETCH_COMMUNITY_POST_FAILURE = 'FETCH_COMMUNITY_POST_FAILURE';
