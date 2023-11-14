import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IData, IDataResult } from '../../types/types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/character',
  }),
  endpoints: (build) => ({
    getCharacters: build.query<IData, { query: string; page: number }>({
      query: ({ query, page }) => `/?page=${page}&name=${query}`,
    }),
    getCharacterItem: build.query<IDataResult, { id: string }>({
      query: ({ id }) => `/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterItemQuery } = apiSlice;
