import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { persistedReducer } from './reducers';

// store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

//persistor
const persistor = persistStore(store);

export { store, persistor };
