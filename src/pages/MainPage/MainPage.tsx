import { useCallback, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import fetchData from '../../services/fetchData';
import Preloader from '../../components/UI/preloader/Preloader';
import CharactersWrapper from '../../components/CharactersWrapper';
import NothingFound from '../../components/NothingFound';
import Pagination from '../../components/Pagination';
import { IData } from '../../types/types';

import classes from './MainPage.module.css';

interface IMainProps {
  searchQuery: string;
}

const Main = ({ searchQuery }: IMainProps) => {
  const [data, setData] = useState<IData | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParams = searchParams.get('page');
  const currentPage = pageParams ? +pageParams : 1;
  const details = searchParams.get('details');

  const getDate = useCallback(() => {
    setIsLoaded(true);

    const currentQuery =
      searchQuery ||
      localStorage.getItem('Veronika2811-react-2023__searchRequest') ||
      '';

    fetchData(currentQuery, currentPage).then(
      (result) => {
        setData(result);
        setIsLoaded(false);
      },
      (error) => {
        console.error(error);
        setIsLoaded(true);
      }
    );
  }, [searchQuery, currentPage]);

  useEffect(() => {
    getDate();
  }, [getDate]);

  useEffect(() => {
    if (!pageParams) {
      setSearchParams((searchParams) => {
        searchParams.set('page', '1');
        return searchParams;
      });
    }
  }, [pageParams, setSearchParams]);

  return (
    <main className={details ? classes.main : ''}>
      {isLoaded && <Preloader />}

      {!isLoaded && data?.results ? (
        <CharactersWrapper
          data={data.results}
          setSearchParams={setSearchParams}
        />
      ) : (
        <NothingFound />
      )}

      {details ? <Outlet /> : ''}

      {data?.info && (
        <Pagination
          currentPage={currentPage}
          info={data.info}
          setSearchParams={setSearchParams}
        />
      )}
    </main>
  );
};

export default Main;
