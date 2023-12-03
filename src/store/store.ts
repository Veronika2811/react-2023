import { configureStore } from '@reduxjs/toolkit';

import reducer from './slice/formSlice';
import counterReducer from './slice/countriesSlice';

export const store = configureStore({
  reducer: {
    FORM_SLICE: reducer,
    COUNTRIES_SLICE: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
