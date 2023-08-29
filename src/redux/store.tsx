import { createStore, applyMiddleware, Action, AnyAction } from 'redux';
import { persistStore } from 'redux-persist';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { persistedReducer } from './modules/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

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
