import { useCallback, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import Preloader from '../UI/preloader/Preloader';
import CardsWrapper from '../CardsWrapper/CardsWrapper';
import Pagination from '../Pagination/Pagination';
import fetchData from '../../services/fetchData';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { charactersChange } from '../../redux/store/charactersSlice';
import { RootState } from '../../redux/store/store';
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

  const { searchQuery, perPage, characters, viewMode } = useAppSelector(
    (state: RootState) => state.CHARACTERS_SLICE
  );
  const dispatch = useAppDispatch();

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const getDate = useCallback(() => {
    setIsLoaded(true);

    const page =
      perPage === ADDITIONAL_VALUE_PER_PAGE && currentPage > +DEFAULT_PAGE
        ? Math.ceil(currentPage / 2)
        : currentPage;

    fetchData(searchQuery, page).then(
      (result) => {
        dispatch(charactersChange(result));
        setIsLoaded(false);
      },
      (error) => {
        console.error(error);
        setIsLoaded(true);
      }
    );
  }, [searchQuery, currentPage, perPage, dispatch]);

  useEffect(() => {
    getDate();
  }, [getDate]);

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
      {isLoaded && <Preloader />}

      {!isLoaded && characters && (
        <CardsWrapper cards={characters.results} currentPage={currentPage} />
      )}

      {viewMode && <Outlet />}

      {!isLoaded && characters && characters.info && (
        <Pagination count={characters.info.count} currentPage={currentPage} />
      )}
    </main>
  );
};

export default MainWrapper;
