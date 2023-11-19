import {
  ADDITIONAL_VALUE_PER_PAGE,
  DEFAULT_VALUE_PER_PAGE,
} from '../../constants/constants';
import { IDataResult } from '../../types/types';

const changePerPage = (
  items: IDataResult[],
  currentPage: number,
  perPage: number
) => {
  return (currentPage * perPage) % DEFAULT_VALUE_PER_PAGE !== 0
    ? items.slice(0, ADDITIONAL_VALUE_PER_PAGE)
    : items.slice(-ADDITIONAL_VALUE_PER_PAGE);
};

export default changePerPage;
