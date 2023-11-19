import { createSlice } from '@reduxjs/toolkit';
import { getLastRequest } from '../utils/local-storage';

const initialvalue = getLastRequest();

export const searchkeySlice = createSlice({
  name: 'searchkey',
  initialState: { value: initialvalue },
  reducers: {
    setSearchKeyValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchKeyValue } = searchkeySlice.actions;
export const selectSearchkey = (state) => state.searchkey.value;
export default searchkeySlice.reducer;
