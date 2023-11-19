import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../utils/store';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: { value: false },
  reducers: {
    setLoadingValue: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});
export const { setLoadingValue } = loadingSlice.actions;
export const selectLoading = (state: RootState) => state.loading.value;
export default loadingSlice.reducer;
