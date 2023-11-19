import { IData } from '@/types/types';

type TInitialState = {
  query: string;
  perPage: number;
  viewMode: string;
  characters: IData | null;
  isLoadingMainPage: boolean;
  isLoadingDetailingPage: boolean;
};

export default TInitialState;
