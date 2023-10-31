import React from 'react';

import './styles.css';

interface IPaginationProps {
  disable: {
    left: boolean;
    right: boolean;
  };
  pages: {
    current: number;
    total: number;
  };
  onClickNextPage: () => void;
  onClickPrevPage: () => void;
}

const Pagination = ({
  disable,
  pages,
  onClickNextPage,
  onClickPrevPage,
}: IPaginationProps) => {
  return (
    <div className="main__pagination pagination">
      <button
        type="button"
        disabled={disable.left}
        className="pagination__controls previous__page"
        onClick={onClickPrevPage}
      >
        &lt;
      </button>
      <span className="pagination__page">
        {pages.current} / {pages.total}
      </span>
      <button
        type="button"
        disabled={disable.right}
        className="pagination__controls slider__navigation next__page"
        onClick={onClickNextPage}
      >
        &gt;
      </button>
    </div>
  );
};

export default React.memo(Pagination);
