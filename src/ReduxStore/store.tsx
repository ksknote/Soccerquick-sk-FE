import { createStore, applyMiddleware, Action, AnyAction } from 'redux';
import { persistStore } from 'redux-persist';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import rootReducer from './modules/rootReducer';
import { persistedReducer } from './modules/rootReducer';

const store = createStore(persistedReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

const persistor = persistStore(store);

export { store, persistor };
