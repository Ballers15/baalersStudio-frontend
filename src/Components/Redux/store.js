import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import LoadingSliceReducer from './reducer';
import isClaimedReducer from './isClaimedReducer';


export const store = configureStore({
  reducer: {
    loading: LoadingSliceReducer,
    claimed: isClaimedReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

setupListeners(store.dispatch);