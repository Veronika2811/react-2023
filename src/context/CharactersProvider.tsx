import { PropsWithChildren, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CharactersContext } from './context';
import {
  DEFAULT_VALUE_PER_PAGE,
  DETAILS_URL_PARAMETER_KEY,
  LOCAL_STORAGE_KEY,
} from '../constants/constants';
import { IData } from '../types/types';

export const CharactersProvider = ({ children }: PropsWithChildren) => {
  const [searchParams] = useSearchParams();

  const { Provider } = CharactersContext;

  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem(LOCAL_STORAGE_KEY) || ''
  );
  const [perPage, setPerPage] = useState<number>(DEFAULT_VALUE_PER_PAGE);
  const [data, setData] = useState<IData | null>(null);
  const [detailedCard, setDetailedCard] = useState<string>(
    searchParams.get(DETAILS_URL_PARAMETER_KEY) || ''
  );

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      perPage,
      setPerPage,
      data,
      setData,
      detailedCard,
      setDetailedCard,
    }),
    [searchQuery, perPage, data, detailedCard]
  );

  return <Provider value={value}>{children}</Provider>;
};
