import React from 'react';
import { SetURLSearchParams } from 'react-router-dom';

import { IDataInfo } from '../types/types';

interface IPaginationProps {
  currentPage: number;
  info: IDataInfo;
  setSearchParams: SetURLSearchParams;
}

const Pagination = ({
  currentPage,
  info,
  setSearchParams,
}: IPaginationProps) => {
  const onChangePage = (page: number) => {
    setSearchParams((searchParams) => {
      searchParams.set('page', page.toString());
      return searchParams;
    });
  };

  return (
    <div className="main__pagination pagination">
      <button
        type="button"
        disabled={currentPage === 1}
        className="pagination__controls previous__page"
        onClick={() => onChangePage(--currentPage)}
      >
        &lt;
      </button>
      <span className="pagination__page">
        {currentPage} / {info.pages}
      </span>
      <button
        type="button"
        disabled={currentPage === info.pages}
        className="pagination__controls slider__navigation next__page"
        onClick={() => onChangePage(++currentPage)}
      >
        &gt;
      </button>
    </div>
  );
};

export default React.memo(Pagination);
