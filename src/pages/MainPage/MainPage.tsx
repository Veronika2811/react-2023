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
  perPage: number;
}

const Main = ({ searchQuery, perPage }: IMainProps) => {
  const [data, setData] = useState<IData | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParams = searchParams.get('page');
  const currentPage = pageParams ? +pageParams : 1;
  const details = searchParams.get('details');

  const getDate = useCallback(() => {
    setIsLoaded(true);

    const page =
      perPage === 10 && currentPage > 1
        ? Math.ceil(currentPage / 2)
        : currentPage;

    const currentQuery =
      searchQuery ||
      localStorage.getItem('Veronika2811-react-2023__searchRequest') ||
      '';

    fetchData(currentQuery, page).then(
      (result) => {
        setData(result);
        setIsLoaded(false);
      },
      (error) => {
        console.error(error);
        setIsLoaded(true);
      }
    );
  }, [searchQuery, currentPage, perPage]);

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

  const changePerPage = () => {
    return (currentPage * perPage) % 20 !== 0
      ? data?.results.slice(0, 10)
      : data?.results.slice(-10);
  };

  return (
    <main className={details ? classes.main : ''}>
      {isLoaded && <Preloader />}

      {!isLoaded && data?.results ? (
        <CharactersWrapper
          data={
            data.results && perPage === 10 ? changePerPage()! : data.results
          }
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
          perPage={perPage}
        />
      )}
    </main>
  );
};

export default Main;
