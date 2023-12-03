import { createSlice } from '@reduxjs/toolkit';

import INITIAL_STATE_COUNTRIES from '../../utils/constants/listCountries';

const countriesSlice = createSlice({
  name: 'COUNTRIES_SLICE',
  initialState: INITIAL_STATE_COUNTRIES,
  reducers: {},
});

const { reducer } = countriesSlice;

export default reducer;
