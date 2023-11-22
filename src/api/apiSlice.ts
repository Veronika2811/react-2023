import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { IData, IDataResult } from '@/types/types';
import {
  ADDITIONAL_VALUE_PER_PAGE,
  BASE_URL,
  DEFAULT_PAGE,
  DEFAULT_VALUE_PER_PAGE,
} from '@/constants/constants';

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
        query: string | string[] | undefined;
        currentPage: string | string[] | undefined;
        perPage: string | string[] | undefined;
      }
    >({
      query: ({
        query = '',
        currentPage = DEFAULT_PAGE,
        perPage = DEFAULT_VALUE_PER_PAGE,
      }) => {
        const page =
          perPage &&
          currentPage &&
          +perPage === ADDITIONAL_VALUE_PER_PAGE &&
          +currentPage > +DEFAULT_PAGE
            ? Math.ceil(+currentPage / 2)
            : currentPage;

        return `/?page=${page}&name=${query}`;
      },
    }),
    getCharacterItem: build.query<
      IDataResult,
      { id: string | string[] | undefined }
    >({
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
