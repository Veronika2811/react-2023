import React from 'react';
// import { useSearchParams } from 'react-router-dom';

import getTotalPages from '@/utils/getTotalPages/getTotalPages';
// import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { charactersChangeViewMode } from '@/store/slice/charactersSlice';
import { RootState } from '@/store/store';
import { IDataInfo } from '@/types/types';
import {
  ADDITIONAL_VALUE_PER_PAGE,
  // DETAILS_URL_PARAMETER_KEY,
  // PAGE_URL_PARAMETER_KEY,
} from '@/constants/constants';

import classes from './Pagination.module.css';
import { useRouter } from 'next/router';
import { usePathname, useSearchParams } from 'next/navigation';

interface IPaginationProps {
  info: IDataInfo;
  currentPage: number;
}

const Pagination = ({ info, currentPage }: IPaginationProps) => {
  const router = useRouter()
  // const asPath = router.asPath
  // const path = usePathname();

  // console.log(router)

  const { name, perPage } = router.query;

  // const searchParams = useSearchParams()
  // const name = searchParams.get('name');

  // useEffect(() => {
  //   router.push('/?page=1', undefined, { shallow: true })

  // const pageParams = useSearchParams();

  // const params = new URLSearchParams(pageParams)

  // params.set('page', '1')
  
  // const [, setSearchParams] = useSearchParams();

  // const { perPage, viewMode } = useAppSelector(
  //   (state: RootState) => state.CHARACTERS_SLICE
  // );
  // const dispatch = useAppDispatch();

  // const onChangePage = (page: number) => {
  const onChangePage = (page: number) => {
    onCloseDetailPanel();
    // query: currentValue? { name: currentValue} : {},

    router.push({
      pathname: '/',
      // name : { name: name} : {},
      // query: page? { page } : {},
      query: { name: name || '', page: page || 1, perPage: perPage || 20 },
      // asPath,
    })
    // router.push(`/?page=${page}`);
    // params.set('page', page.toString())

    // setSearchParams((searchParams) => {
    //   searchParams.set(PAGE_URL_PARAMETER_KEY, page.toString());
    //   return searchParams;
    // });
  };

  const onCloseDetailPanel = () => {
    // if (viewMode) {
    //   dispatch(charactersChangeViewMode(''));
    //   // setSearchParams((searchParams) => {
    //   //   searchParams.delete(DETAILS_URL_PARAMETER_KEY);
    //   //   return searchParams;
    //   // });
    // }
  };

  const totalPage =
  perPage && +perPage === ADDITIONAL_VALUE_PER_PAGE
      ? getTotalPages(info.count, +perPage)
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
        {/* //  / {totalPage} */}
      </span>
      <button
        data-testid="next-page"
        type="button"
        disabled={currentPage >= totalPage}
        // disabled={currentPage === info.pages}
        className={classes.pagination__controls}
        onClick={() => onChangePage(++currentPage)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
