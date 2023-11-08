import { PropsWithChildren, useState, useMemo } from 'react';

import { IData } from '../types/types';
import { CharactersContext } from './context';

export const CharactersProvider = ({ children }: PropsWithChildren) => {
  const { Provider } = CharactersContext;

  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem('Veronika2811-react-2023__searchRequest') || ''
  );
  const [perPage, setPerPage] = useState<number>(20);
  const [data, setData] = useState<IData | null>(null);

  const value = useMemo(
    () => ({ searchQuery, setSearchQuery, perPage, setPerPage, data, setData }),
    [searchQuery, perPage, data]
  );

  return <Provider value={value}>{children}</Provider>;
};
