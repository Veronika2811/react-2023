import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import reducer from './charactersSlice';

const rootReducer = combineReducers({
  CHARACTERS_SLICE: reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: {
      CHARACTERS_SLICE: reducer,
    },
    preloadedState,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
