import { BASE_URL } from '../constants/constants';
import { IDataResult } from '../types/types';

const fetchItemData = async (id: string) => {
  const url = `${BASE_URL}${id}`;

  const res = await fetch(url);
  const data: IDataResult = await res.json();
  return data;
};

export default fetchItemData;
