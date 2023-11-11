import React, { createContext } from 'react';

import { IData } from '../types/types';

export type TCharactersContext = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  perPage: number;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  data: IData | null;
  setData: React.Dispatch<React.SetStateAction<IData | null>>;
  detailedCard: string;
  setDetailedCard: React.Dispatch<React.SetStateAction<string>>;
};

export const CharactersContext = createContext<TCharactersContext>(null!);
