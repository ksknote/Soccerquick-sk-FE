import axios from 'axios';
import { fetchDataActionTypes } from './actionTypes';

import { AppThunk } from '../../store';

export const fetchData = (url: string | undefined): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/groups/${url}`
      );
      const item = res.data.data;
      const formattedData = {
        ...item,
        author: item.leader_name,
        gk: item.gk_current_count,
        gkNeed: item.gk_count,
        player: item.player_current_count,
        playerNeed: item.player_count,
        area: item.location,
      };
      dispatch(fetchDataSuccess(formattedData));
    } catch (error: any) {
      dispatch(fetchDataFailure(error.message));
      console.log('데이터를 가져오는 중에 에러가 발생했습니다.');
    }
  };
};

export const fetchDataRequest = () => ({
  type: fetchDataActionTypes.FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (data: string) => ({
  type: fetchDataActionTypes.FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error: string) => ({
  type: fetchDataActionTypes.FETCH_DATA_FAIL,
  payload: error,
});
