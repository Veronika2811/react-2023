import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import Preloader from '../UI/preloader/Preloader';
import CardsWrapper from '../CardsWrapper/CardsWrapper';
import Pagination from '../Pagination/Pagination';
import NothingFound from '@/views/NothingFound/NothingFound';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { useGetCharactersQuery } from '@/api/apiSlice';
import { DEFAULT_PAGE, PAGE_URL_PARAMETER_KEY } from '@/constants/constants';

import classes from './MainWrapper.module.css';

const MainWrapper = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParams = searchParams.get(PAGE_URL_PARAMETER_KEY);
  const currentPage = +(pageParams ? pageParams : DEFAULT_PAGE);

  const { query, perPage, viewMode, isLoadingMainPage } = useAppSelector(
    (state: RootState) => state.CHARACTERS_SLICE
  );

  const { data, isError } = useGetCharactersQuery({
    query,
    currentPage,
    perPage,
  });

  useEffect(() => {
    if (!pageParams) {
      setSearchParams((searchParams) => {
        searchParams.set(PAGE_URL_PARAMETER_KEY, DEFAULT_PAGE);
        return searchParams;
      });
    }
  }, [pageParams, setSearchParams]);

  return (
    <main className={viewMode ? classes.main : ''}>
      {isLoadingMainPage && <Preloader />}

      {!isLoadingMainPage && isError ? (
        <NothingFound />
      ) : (
        data && (
          <>
            <CardsWrapper cards={data.results} currentPage={currentPage} />
            {viewMode && <Outlet />}
            <Pagination info={data.info} currentPage={currentPage} />
          </>
        )
      )}
    </main>
  );
};

export default MainWrapper;
