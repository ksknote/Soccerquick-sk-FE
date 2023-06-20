import { combineReducers } from 'redux';
import fetchDataReducer from './TeamPage/reducer';
import authSlice from './Auth/authSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  data: fetchDataReducer,
  auth: authSlice,
  // 다른 리듀서 경로 추가
});

export default rootReducer;

// redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'data'], // 새로고침 시 유지해야 하는 데이터 목록. 만약 새로고침 시 삭제되어야 한다면 blacklist에 등재해야 함.
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
