export interface IDataError {
  error?: string;
}

export interface IDataInfo {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
}

export interface IDataResult extends IDataError {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
}

export interface IData extends IDataError {
  info: IDataInfo;
  results: IDataResult[];
}
