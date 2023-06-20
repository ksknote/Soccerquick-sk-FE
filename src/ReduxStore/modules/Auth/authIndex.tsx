import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice, { AuthState } from './authSlice';

// combine reducer
export type RootState = {
  auth: AuthState;
};

const rootReducer = combineReducers<RootState>({
  auth: authSlice,
});

// redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
