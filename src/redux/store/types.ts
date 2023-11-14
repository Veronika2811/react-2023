import { IData } from '../../types/types';

type TInitialState = {
  searchQuery: string;
  perPage: number;
  characters: IData | null;
  viewMode: string;
};

export default TInitialState;
