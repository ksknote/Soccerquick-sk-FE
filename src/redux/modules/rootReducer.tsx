import { combineReducers } from 'redux';
import teamPostReducer from './team/reducer';
import communityPostReducer from './community/reducer';
import authReducer from './auth/reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AuthStateType } from './auth/types';
import { CommunityPostStateType } from './community/types';
import { TeamDataType } from './team/reducer';

export type RootState = {
  auth: AuthStateType;
  teamPost: TeamDataType;
  communityPost: CommunityPostStateType;
};

const rootReducer = combineReducers({
  auth: authReducer,
  teamPost: teamPostReducer,
  communityPost: communityPostReducer,
});

export default rootReducer;

// redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'teamPost', 'communityPost'], // 새로고침 시 유지해야 하는 데이터 목록. 만약 새로고침 시 삭제되어야 한다면 blacklist에 등재해야 함.
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
