import { createSlice } from '@reduxjs/toolkit';

export const limitSlice = createSlice({
  name: 'limit',
  initialState: { value: 10 },
  reducers: {
    setLimitValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLimitValue } = limitSlice.actions;
export const selectLimit = (state) => state.limit.value;
export default limitSlice.reducer;
