import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { persistStore, persistReducer, PERSIST, FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loadingReducer, walletReducer, isClaimedReducer, userReducer } from './reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    loading: loadingReducer,
    claimed: isClaimedReducer,
    wallet: walletReducer,
    user: userReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
