import { configureStore } from '@reduxjs/toolkit';
import searchkeyReducer from '../components/searchSlice';
import limitReducer from '../components/paginationSlice';
import loadingReducer from '../components/loadingSlice';

import giphyApi from './apiSlice';

export default configureStore({
  reducer: {
    searchkey: searchkeyReducer,
    limit: limitReducer,
    loding: loadingReducer,

    [giphyApi.reducerPath]: giphyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(giphyApi.middleware),
});
