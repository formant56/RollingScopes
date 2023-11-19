import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: { value: false },
  reducers: {
    setLoadingValue: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setLoadingValue } = loadingSlice.actions;
export default loadingSlice.reducer;
