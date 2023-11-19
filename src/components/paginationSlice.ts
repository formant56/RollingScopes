import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../utils/store';

export const limitSlice = createSlice({
  name: 'limit',
  initialState: { value: 10 },
  reducers: {
    setLimitValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setLimitValue } = limitSlice.actions;
export const selectLimit = (state: RootState) => state.limit.value;
export default limitSlice.reducer;
