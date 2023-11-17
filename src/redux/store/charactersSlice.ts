import { createSlice } from '@reduxjs/toolkit';

import TInitialState from './types';
import {
  DEFAULT_VALUE_PER_PAGE,
  LOCAL_STORAGE_KEY,
} from '../../constants/constants';

const initialState: TInitialState = {
  query: localStorage.getItem(LOCAL_STORAGE_KEY) || '',
  perPage: DEFAULT_VALUE_PER_PAGE,
  viewMode: '',
  characters: null,
  isLoadingMainPage: true,
  isLoadingDetailingPage: false,
};

const charactersSlice = createSlice({
  name: 'CHARACTERS_SLICE',
  initialState,
  reducers: {
    charactersSaveSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    charactersChangePerPage: (state, action) => {
      state.perPage = action.payload;
    },
    charactersChangeViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    charactersChange: (state, action) => {
      state.characters = action.payload;
    },
    charactersChangeIsLoadingMainPage: (state, action) => {
      state.isLoadingMainPage = action.payload;
    },
    charactersChangeIsLoadingDetailingPage: (state, action) => {
      state.isLoadingDetailingPage = action.payload;
    },
  },
});

const { actions, reducer } = charactersSlice;

export const {
  charactersSaveSearchQuery,
  charactersChangePerPage,
  charactersChangeViewMode,
  charactersChange,
  charactersChangeIsLoadingMainPage,
  charactersChangeIsLoadingDetailingPage,
} = actions;

export default reducer;
