import { createSlice } from '@reduxjs/toolkit';

const controlledFormSlice = createSlice({
  name: 'controlledState',
  initialState: {
    name: '',
    age: 0,
    email: '',
    gender: '',
    password: '',
    country: '',
    img: '',
    atc: '',
  },
  reducers: {
    setControlledFormValues(state, action) {
      const { name, age, email, password, gender, country, img, atc } =
        action.payload;

      if (name !== undefined) state.name = name;
      if (age !== undefined) state.age = age;
      if (email !== undefined) state.email = email;
      if (gender !== undefined) state.gender = gender;
      if (password !== undefined) state.password = password;
      if (img !== undefined) state.img = img;
      if (country !== undefined) state.country = country;
      if (atc !== undefined) state.atc = atc;
    },
  },
});

export const { setControlledFormValues } = controlledFormSlice.actions;

export default controlledFormSlice.reducer;
