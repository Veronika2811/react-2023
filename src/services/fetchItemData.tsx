import { BASE_URL } from '../constants/constants';

const fetchItemData = async (id: string) => {
  const url = `${BASE_URL}${id}`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export default fetchItemData;
