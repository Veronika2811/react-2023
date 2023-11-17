import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import Preloader from '../UI/preloader/Preloader';
import CardsWrapper from '../CardsWrapper/CardsWrapper';
import Pagination from '../Pagination/Pagination';
import NothingFound from '../NothingFound/NothingFound';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store/store';
import { useGetCharactersQuery } from '../../redux/api/apiSlice';
import {
  ADDITIONAL_VALUE_PER_PAGE,
  DEFAULT_PAGE,
  PAGE_URL_PARAMETER_KEY,
} from '../../constants/constants';

import classes from './MainWrapper.module.css';

const MainWrapper = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParams = searchParams.get(PAGE_URL_PARAMETER_KEY);
  const currentPage = +(pageParams ? pageParams : DEFAULT_PAGE);

  const { query, perPage, viewMode, isLoadingMainPage } = useAppSelector(
    (state: RootState) => state.CHARACTERS_SLICE
  );

  const page =
    perPage === ADDITIONAL_VALUE_PER_PAGE && currentPage > +DEFAULT_PAGE
      ? Math.ceil(currentPage / 2)
      : currentPage;

  const { data, isError } = useGetCharactersQuery({
    query,
    page,
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

      {!isLoadingMainPage && isError && <NothingFound />}

      {!isLoadingMainPage && !isError && data && (
        <CardsWrapper cards={data.results} currentPage={currentPage} />
      )}

      {viewMode && <Outlet />}

      {!isLoadingMainPage && data && (
        <Pagination count={data.info.count} currentPage={currentPage} />
      )}
    </main>
  );
};

export default MainWrapper;
