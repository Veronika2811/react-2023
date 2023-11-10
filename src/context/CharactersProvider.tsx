import { PropsWithChildren, useState, useMemo } from 'react';

import { CharactersContext } from './context';
import {
  DEFAULT_VALUE_PER_PAGE,
  LOCAL_STORAGE_KEY,
} from '../constants/constants';
import { IData } from '../types/types';

export const CharactersProvider = ({ children }: PropsWithChildren) => {
  const { Provider } = CharactersContext;

  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem(LOCAL_STORAGE_KEY) || ''
  );
  const [perPage, setPerPage] = useState<number>(DEFAULT_VALUE_PER_PAGE);
  const [data, setData] = useState<IData | null>(null);

  const value = useMemo(
    () => ({ searchQuery, setSearchQuery, perPage, setPerPage, data, setData }),
    [searchQuery, perPage, data]
  );

  return <Provider value={value}>{children}</Provider>;
};
