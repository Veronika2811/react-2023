import { createSlice } from '@reduxjs/toolkit';

interface ICardUser {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  acceptCheckbox: boolean;
  image: string;
  country: string;
}

type TInitialState = {
  user: ICardUser[];
};

const initialState: TInitialState = {
  user: [],
};

const charactersSlice = createSlice({
  name: 'FORM_SLICE',
  initialState,
  reducers: {
    saveDataUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { actions, reducer } = charactersSlice;

export const { saveDataUser } = actions;

export default reducer;
