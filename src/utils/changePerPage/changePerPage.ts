import { IDataResult } from '../../types/types';
import {
  ADDITIONAL_VALUE_PER_PAGE,
  DEFAULT_PAGE,
  DEFAULT_VALUE_PER_PAGE,
} from '../constants/constants';

const changePerPage = (
  items: IDataResult[],
  page: string | string[] | undefined,
  perPage: string | string[] | undefined
) => {
  const currentPage = +(typeof page === 'string' ? page : DEFAULT_PAGE);
  const currentPerPage = +(typeof perPage === 'string'
    ? perPage
    : DEFAULT_VALUE_PER_PAGE);

  return (currentPage * currentPerPage) % +DEFAULT_VALUE_PER_PAGE !== 0
    ? items.slice(0, +ADDITIONAL_VALUE_PER_PAGE)
    : items.slice(-ADDITIONAL_VALUE_PER_PAGE);
};

export default changePerPage;
