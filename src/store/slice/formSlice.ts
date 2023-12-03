import { createSlice } from '@reduxjs/toolkit';

// import { TInitialState } from '../../types/types';
interface TInitialState {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirmation: string;
  gender: string;
  acceptCheckbox: boolean;
  image: string;
  country: string;
}

interface Tfd {
  user: TInitialState[];
}

const initialState: Tfd = {
  user: [],
};

const charactersSlice = createSlice({
  name: 'FORM_SLICE',
  initialState,
  reducers: {
    saveDataUser: (state, action) => {
      state.user = state.user && [...state.user, action.payload];
    },
  },
});

const { actions, reducer } = charactersSlice;

export const { saveDataUser } = actions;

export default reducer;
