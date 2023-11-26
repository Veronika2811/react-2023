import { useRouter } from 'next/router';

import { IDataInfo } from '@/types/types';
import getTotalPages from '@/utils/getTotalPages/getTotalPages';
import {
  ADDITIONAL_VALUE_PER_PAGE,
  DEFAULT_PAGE,
  DEFAULT_VALUE_PER_PAGE,
} from '@/utils/constants/constants';

import classes from './Pagination.module.css';

const Pagination = ({ info }: { info: IDataInfo }) => {
  const router = useRouter();
  const { name, page = DEFAULT_PAGE, perPage } = router.query;

  const onChangePage = (value: number) => {
    router.push({
      pathname: '/',
      query: {
        ...(name ? { name } : {}),
        page: value.toString(),
        perPage: perPage || DEFAULT_VALUE_PER_PAGE,
      },
    });
  };

  const totalPage =
    perPage && perPage === ADDITIONAL_VALUE_PER_PAGE
      ? getTotalPages(info.count, +perPage)
      : info.pages;

  return (
    <div className={classes.pagination}>
      <button
        data-testid="prev-page"
        type="button"
        disabled={page === DEFAULT_PAGE}
        className={classes.pagination__controls}
        onClick={() => onChangePage(+page - 1)}
      >
        &lt;
      </button>
      <span
        className={classes.pagination__page}
        data-testid="pagination-result"
      >
        {page} / {totalPage}
      </span>
      <button
        data-testid="next-page"
        type="button"
        disabled={+page >= totalPage}
        className={classes.pagination__controls}
        onClick={() => onChangePage(+page + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
