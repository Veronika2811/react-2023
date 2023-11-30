import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import reducer from './formSlice';

const rootReducer = combineReducers({
  CHARACTERS_SLICE: reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: {
      CHARACTERS_SLICE: reducer,
    },
  });
};

export const store = setupStore();

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
