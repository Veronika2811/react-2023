import React from 'react';
import { useSearchParams } from 'react-router-dom';

import getTotalPages from '@/utils/getTotalPages/getTotalPages';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { charactersChangeViewMode } from '@/store/slice/charactersSlice';
import { RootState } from '@/store/store';
import { IDataInfo } from '@/types/types';
import {
  ADDITIONAL_VALUE_PER_PAGE,
  DETAILS_URL_PARAMETER_KEY,
  PAGE_URL_PARAMETER_KEY,
} from '@/constants/constants';

import classes from './Pagination.module.css';

interface IPaginationProps {
  info: IDataInfo;
  currentPage: number;
}

const Pagination = ({ info, currentPage }: IPaginationProps) => {
  const [, setSearchParams] = useSearchParams();

  const { perPage, viewMode } = useAppSelector(
    (state: RootState) => state.CHARACTERS_SLICE
  );
  const dispatch = useAppDispatch();

  const onChangePage = (page: number) => {
    onCloseDetailPanel();

    setSearchParams((searchParams) => {
      searchParams.set(PAGE_URL_PARAMETER_KEY, page.toString());
      return searchParams;
    });
  };

  const onCloseDetailPanel = () => {
    if (viewMode) {
      dispatch(charactersChangeViewMode(''));
      setSearchParams((searchParams) => {
        searchParams.delete(DETAILS_URL_PARAMETER_KEY);
        return searchParams;
      });
    }
  };

  const totalPage =
    perPage === ADDITIONAL_VALUE_PER_PAGE
      ? getTotalPages(info.count, perPage)
      : info.pages;

  return (
    <div
      className={classes.pagination}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCloseDetailPanel();
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

export default React.memo(Pagination);
