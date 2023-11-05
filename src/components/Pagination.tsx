import React from 'react';
import { SetURLSearchParams } from 'react-router-dom';

import { IDataInfo } from '../types/types';

interface IPaginationProps {
  currentPage: number;
  info: IDataInfo;
  setSearchParams: SetURLSearchParams;
  perPage: number;
}

const Pagination = ({
  currentPage,
  info,
  setSearchParams,
  perPage,
}: IPaginationProps) => {
  const onChangePage = (page: number) => {
    setSearchParams((searchParams) => {
      searchParams.set('page', page.toString());
      searchParams.delete('details');
      return searchParams;
    });
  };

  return (
    <div
      className="main__pagination pagination"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setSearchParams((searchParams) => {
            searchParams.delete('details');
            return searchParams;
          });
        }
      }}
    >
      <button
        type="button"
        disabled={currentPage === 1}
        className="pagination__controls previous__page"
        onClick={() => onChangePage(--currentPage)}
      >
        &lt;
      </button>
      <span className="pagination__page">
        {currentPage} / {Math.ceil(info.count / perPage)}
      </span>
      <button
        type="button"
        disabled={currentPage >= info.count / perPage}
        className="pagination__controls slider__navigation next__page"
        onClick={() => onChangePage(++currentPage)}
      >
        &gt;
      </button>
    </div>
  );
};

export default React.memo(Pagination);
