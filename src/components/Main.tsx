import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import fetchData from '../services/fetchData';
import Preloader from './UI/preloader/Preloader';
import CharactersWrapper from './CharactersWrapper';
import NothingFound from './NothingFound';
import Pagination from './Pagination';
import { IData } from '../types/types';

import './styles.css';

interface IMainProps {
  searchQuery: string;
}

const Main = ({ searchQuery }: IMainProps) => {
  const [data, setData] = useState<IData | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParams = searchParams.get('page');
  const currentPage = pageParams ? +pageParams : 1;

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

    if (!pageParams) {
      setSearchParams((searchParams) => {
        searchParams.set('page', '1');
        return searchParams;
      });
    }
  }, [searchQuery, pageParams, setSearchParams, getDate]);

  return (
    <main className="main">
      {isLoaded && <Preloader />}
      {!isLoaded && data?.results ? (
        <CharactersWrapper data={data.results} />
      ) : (
        <NothingFound />
      )}

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
