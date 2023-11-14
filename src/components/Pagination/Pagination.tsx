import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { charactersChangeViewMode } from '../../redux/store/charactersSlice';
import { RootState } from '../../redux/store/store';
import {
  DETAILS_URL_PARAMETER_KEY,
  PAGE_URL_PARAMETER_KEY,
} from '../../constants/constants';

import classes from './Pagination.module.css';

interface IPaginationProps {
  count: number;
  currentPage: number;
}

const Pagination = ({ currentPage, count }: IPaginationProps) => {
  const [, setSearchParams] = useSearchParams();

  const { perPage, viewMode } = useAppSelector(
    (state: RootState) => state.CHARACTERS_SLICE
  );
  const dispatch = useAppDispatch();

  const onChangePage = (page: number) => {
    console.log(page);
    if (viewMode) {
      dispatch(charactersChangeViewMode(''));
    }

    setSearchParams((searchParams) => {
      searchParams.set(PAGE_URL_PARAMETER_KEY, page.toString());
      searchParams.delete(DETAILS_URL_PARAMETER_KEY);
      return searchParams;
    });
  };

  return (
    <div
      className={classes.pagination}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          if (viewMode) {
            dispatch(charactersChangeViewMode(''));
          }
          setSearchParams((searchParams) => {
            searchParams.delete(DETAILS_URL_PARAMETER_KEY);
            return searchParams;
          });
        }
      }}
    >
      <button
        type="button"
        disabled={currentPage === 1}
        className={classes.pagination__controls}
        onClick={() => onChangePage(--currentPage)}
      >
        &lt;
      </button>
      <span className={classes.pagination__page}>
        {currentPage} / {Math.ceil(count / perPage)}
      </span>
      <button
        data-testid="next-page"
        type="button"
        disabled={currentPage >= count / perPage}
        className={classes.pagination__controls}
        onClick={() => onChangePage(++currentPage)}
      >
        &gt;
      </button>
    </div>
  );
};

export default React.memo(Pagination);
