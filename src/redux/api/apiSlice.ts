import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  charactersChange,
  charactersChangeIsLoadingDetailingPage,
  charactersChangeIsLoadingMainPage,
} from '../store/charactersSlice';
import { IData, IDataResult } from '../../types/types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/character',
  }),
  endpoints: (build) => ({
    getCharacters: build.query<IData, { query: string; page: number }>({
      query: ({ query, page }) => `/?page=${page}&name=${query}`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(charactersChangeIsLoadingMainPage(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(charactersChange(data));
          dispatch(charactersChangeIsLoadingMainPage(false));
        } catch {
          console.error(
            'Sorry, there are no characters matching your request.'
          );
        } finally {
          dispatch(charactersChangeIsLoadingMainPage(false));
        }
      },
    }),
    getCharacterItem: build.query<IDataResult, { id: string }>({
      query: ({ id }) => `/${id}`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(charactersChangeIsLoadingDetailingPage(true));
        try {
          await queryFulfilled;
          dispatch(charactersChangeIsLoadingDetailingPage(false));
        } catch {
          console.error('Sorry, there are no character matching your request.');
        } finally {
          dispatch(charactersChangeIsLoadingDetailingPage(false));
        }
      },
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterItemQuery } = apiSlice;
