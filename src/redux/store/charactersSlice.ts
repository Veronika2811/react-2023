import { createSlice } from '@reduxjs/toolkit';

import TInitialState from './types';
import {
  DEFAULT_VALUE_PER_PAGE,
  LOCAL_STORAGE_KEY,
} from '../../constants/constants';

const initialState: TInitialState = {
  searchQuery: localStorage.getItem(LOCAL_STORAGE_KEY) || '',
  perPage: DEFAULT_VALUE_PER_PAGE,
  characters: null,
  viewMode: '',
};

const charactersSlice = createSlice({
  name: 'CHARACTERS_SLICE',
  initialState,
  reducers: {
    charactersSaveSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
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
  },
});

const { actions, reducer } = charactersSlice;

export const {
  charactersSaveSearchQuery,
  charactersChangePerPage,
  charactersChangeViewMode,
  charactersChange,
} = actions;

export default reducer;
