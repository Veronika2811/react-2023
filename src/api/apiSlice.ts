import { HYDRATE } from 'next-redux-wrapper';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IData, IDataResult } from '@/types/types';
import {
  ADDITIONAL_VALUE_PER_PAGE,
  BASE_URL,
  DEFAULT_PAGE,
} from '@/utils/constants/constants';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getCharacters: build.query<
      IData,
      {
        currentPage: string;
        perPage: string;
        query?: string;
      }
    >({
      query: ({ query, currentPage, perPage }) => {
        const page =
          perPage &&
          currentPage &&
          perPage === ADDITIONAL_VALUE_PER_PAGE &&
          +currentPage > +DEFAULT_PAGE
            ? Math.ceil(+currentPage / 2)
            : currentPage;

        return `/?page=${page}${query ? `&name=${query}` : ''}`;
      },
    }),
    getCharacterItem: build.query<IDataResult, { id: string }>({
      query: ({ id }) => `/${id}`,
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterItemQuery,
  util: { getRunningQueriesThunk },
} = apiSlice;

export const { getCharacters, getCharacterItem } = apiSlice.endpoints;
