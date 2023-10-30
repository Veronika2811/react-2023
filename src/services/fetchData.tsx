import { BASE_URL } from '../constants/constants';

const fetchData = async (query: string) => {
  const url = `${BASE_URL}?name=${query}`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export default fetchData;
