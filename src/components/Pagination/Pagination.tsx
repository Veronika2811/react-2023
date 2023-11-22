import { useRouter } from 'next/router';

import getTotalPages from '@/utils/getTotalPages/getTotalPages';
import { IDataInfo } from '@/types/types';
import { ADDITIONAL_VALUE_PER_PAGE } from '@/constants/constants';

import classes from './Pagination.module.css';

interface IPaginationProps {
  info: IDataInfo;
  currentPage: number;
}

const Pagination = ({ info, currentPage }: IPaginationProps) => {
  const router = useRouter();
  const { name, perPage } = router.query;

  const onChangePage = (page: number) => {
    router.push({
      pathname: '/',
      query: { name: name || '', page: page || 1, perPage: perPage || 20 },
    });
  };

  const totalPage =
    perPage && +perPage === ADDITIONAL_VALUE_PER_PAGE
      ? getTotalPages(info.count, +perPage)
      : info.pages;

  return (
    <div className={classes.pagination}>
      <button
        type="button"
        disabled={currentPage === 1}
        className={classes.pagination__controls}
        onClick={() => onChangePage(--currentPage)}
      >
        &lt;
      </button>
      <span className={classes.pagination__page}>
        {currentPage} / {totalPage}
      </span>
      <button
        data-testid="next-page"
        type="button"
        disabled={currentPage >= totalPage}
        className={classes.pagination__controls}
        onClick={() => onChangePage(++currentPage)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
