import { createSlice } from '@reduxjs/toolkit';

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledState',
  initialState: {
    name: '',
    age: 0,
    email: '',
    gender: '',
    password: '',
    country: '',
    atc: '',
    img: '',
  },
  reducers: {
    setFormValues(state, action) {
      const { name, age, email, password, gender, country, atc, img } =
        action.payload;

      if (name !== undefined) state.name = name;
      if (age !== undefined) state.age = age;
      if (email !== undefined) state.email = email;
      if (gender !== undefined) state.gender = gender;
      if (password !== undefined) state.password = password;
      if (img !== undefined) state.img = img;
      if (atc !== undefined) state.atc = atc;
      if (country !== undefined) state.country = country;
    },
  },
});

export const { setFormValues } = uncontrolledFormSlice.actions;

export default uncontrolledFormSlice.reducer;
