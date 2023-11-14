import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import Preloader from '../UI/preloader/Preloader';
import CardsWrapper from '../CardsWrapper/CardsWrapper';
import Pagination from '../Pagination/Pagination';
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

  const { searchQuery, perPage, viewMode } = useAppSelector(
    (state: RootState) => state.CHARACTERS_SLICE
  );

  const page =
    perPage === ADDITIONAL_VALUE_PER_PAGE && currentPage > +DEFAULT_PAGE
      ? Math.ceil(currentPage / 2)
      : currentPage;

  const { data, isLoading, isFetching } = useGetCharactersQuery({
    query: searchQuery,
    page: page,
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
      {isLoading && isFetching && <Preloader />}

      {!isLoading && !isFetching && data && (
        <CardsWrapper cards={data.results} currentPage={currentPage} />
      )}

      {viewMode && <Outlet />}

      {!isLoading && !isFetching && data && data.info && (
        <Pagination count={data.info.count} currentPage={currentPage} />
      )}
    </main>
  );
};

export default MainWrapper;
