import React from 'react';
import { fetchDataActionTypes } from './types';

export interface TeamDataType {
  data: string | null;
  loading: boolean;
  error: string | null;
}
const initialState: TeamDataType = {
  data: null,
  loading: false,
  error: null,
};

const teamPostReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case fetchDataActionTypes.FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case fetchDataActionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case fetchDataActionTypes.FETCH_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default teamPostReducer;
