import { configureStore } from '@reduxjs/toolkit';
import uncontrolledStateReducer from './utils/uncontrolledFormSlice';
import controlledStateReducer from './utils/controlledFormSlice';
import countriesReducer from './utils/countriesSlice';

export const store = configureStore({
  reducer: {
    uncontrolledState: uncontrolledStateReducer,
    controlledState: controlledStateReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
