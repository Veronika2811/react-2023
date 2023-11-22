import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  charactersChange,
  charactersChangeIsLoadingDetailingPage,
  charactersChangeIsLoadingMainPage,
} from '@/store/slice/charactersSlice';
import { IData, IDataResult } from '@/types/types';
import {
  ADDITIONAL_VALUE_PER_PAGE,
  BASE_URL,
  DEFAULT_PAGE,
} from '@/constants/constants';
import { HYDRATE } from 'next-redux-wrapper'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (build) => ({
    getCharacters: build.query<
      IData,
      { query: string | string[] | undefined; currentPage: string | string[] | undefined; perPage: string | string[] | undefined }
    >({
      query: ({ query = '', currentPage = 1, perPage = 20 }) => {
        const page =
        perPage && currentPage && +perPage === ADDITIONAL_VALUE_PER_PAGE && +currentPage > +DEFAULT_PAGE
            ? Math.ceil(+currentPage / 2)
            : currentPage;

        return `/?page=${page}&name=${query}`;
      },
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
    getCharacterItem: build.query<IDataResult, { id: string | string[] | undefined }>({
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

export const {
  useGetCharactersQuery,
  useGetCharacterItemQuery,
  util: { getRunningQueriesThunk },
} = apiSlice;

export const { getCharacters, getCharacterItem } = apiSlice.endpoints;
