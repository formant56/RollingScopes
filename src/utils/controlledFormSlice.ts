import { createSlice } from '@reduxjs/toolkit';

const controlledFormSlice = createSlice({
  name: 'example',
  initialState: {
    value1: 0,
    value2: 'initial',
    name: "",
    age: 0,
    email: "",
    password: "",
    gender: '',
  },
  reducers: {
    incrementValue1: state => {
      state.value1 += 1;
    },
    setValue2: (state, action) => {
      state.value2 = action.payload;
    },
  },
});

export const { incrementValue1, setValue2 } = controlledFormSlice.actions;

export default controlledFormSlice.reducer;