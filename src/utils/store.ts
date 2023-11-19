import { configureStore } from '@reduxjs/toolkit';
import searchkeyReducer from '../components/searchSlice';
import limitReducer from '../components/paginationSlice';
import loadingReducer from '../components/loadingSlice';

import giphyApi from './apiSlice';

export const store = configureStore({
  reducer: {
    searchkey: searchkeyReducer,
    limit: limitReducer,
    loading: loadingReducer,

    [giphyApi.reducerPath]: giphyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(giphyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
