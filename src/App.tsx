import { useState, useEffect, useCallback } from 'react';

import Header from './components/Header';
import Preloader from './components/UI/preloader/Preloader';
import CharactersWrapper from './components/CharactersWrapper';
import NothingFound from './components/NothingFound';
import fetchData from './services/fetchData';
import { IData } from './types/types';

import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<IData | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
  }, [searchQuery, currentPage, getDate]);

  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      {isLoaded && <Preloader />}
      {!isLoaded && data?.results ? (
        <CharactersWrapper
          data={data}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <NothingFound />
      )}
    </>
  );
};

export default App;
