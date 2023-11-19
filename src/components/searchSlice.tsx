import { createSlice } from '@reduxjs/toolkit';
import { getLastRequest } from '../utils/local-storage';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../utils/store';

const initialvalue = getLastRequest();

export const searchkeySlice = createSlice({
  name: 'searchkey',
  initialState: { value: initialvalue },
  reducers: {
    setSearchKeyValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchKeyValue } = searchkeySlice.actions;
export const selectSearchkey = (state: RootState) => state.searchkey.value;
export default searchkeySlice.reducer;
