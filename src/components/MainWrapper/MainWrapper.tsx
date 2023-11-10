import { useCallback, useContext, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import Preloader from '../UI/preloader/Preloader';
import CardsWrapper from '../CardsWrapper/CardsWrapper';
import Pagination from '../Pagination/Pagination';
import fetchData from '../../services/fetchData';
import { CharactersContext } from '../../context/context';
import {
  ADDITIONAL_VALUE_PER_PAGE,
  DEFAULT_PAGE,
  DETAILS_URL_PARAMETER_KEY,
  PAGE_URL_PARAMETER_KEY,
} from '../../constants/constants';

import classes from './MainWrapper.module.css';

const MainWrapper = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery, perPage, data, setData } = useContext(CharactersContext);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const pageParams = searchParams.get(PAGE_URL_PARAMETER_KEY);
  const detailsParams = searchParams.get(DETAILS_URL_PARAMETER_KEY);

  const currentPage = +(pageParams ? pageParams : DEFAULT_PAGE);

  const getDate = useCallback(() => {
    setIsLoaded(true);

    const page =
      perPage === ADDITIONAL_VALUE_PER_PAGE && currentPage > +DEFAULT_PAGE
        ? Math.ceil(currentPage / 2)
        : currentPage;

    fetchData(searchQuery, page).then(
      (result) => {
        setData(result);
        setIsLoaded(false);
      },
      (error) => {
        console.error(error);
        setIsLoaded(true);
      }
    );
  }, [searchQuery, currentPage, perPage, setData]);

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
    <main className={detailsParams ? classes.main : ''}>
      {isLoaded && <Preloader />}

      {!isLoaded && data && (
        <CardsWrapper cards={data.results} currentPage={currentPage} />
      )}

      <Outlet />

      {!isLoaded && data && data.info && (
        <Pagination info={data.info} currentPage={currentPage} />
      )}
    </main>
  );
};

export default MainWrapper;
