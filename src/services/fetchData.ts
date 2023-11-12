import { IData } from '../types/types';
import { BASE_URL } from '../constants/constants';

const fetchData = async (query: string, page: number) => {
  const url = `${BASE_URL}?page=${page}&name=${query}`;

  const res = await fetch(url);
  const data: IData = await res.json();
  return data;
};

export default fetchData;
