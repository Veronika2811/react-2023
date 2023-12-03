import { createSlice } from '@reduxjs/toolkit';

import { IInitialStateFormSlice } from '../../types/types';

const initialState: IInitialStateFormSlice = {
  users: [],
};

const charactersSlice = createSlice({
  name: 'FORM_SLICE',
  initialState,
  reducers: {
    saveDataUser: (state, action) => {
      state.users = state.users && [...state.users, action.payload];
    },
  },
});

const { actions, reducer } = charactersSlice;

export const { saveDataUser } = actions;

export default reducer;
