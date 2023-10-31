import { useState, useEffect } from 'react';

import Header from './components/Header';
import Preloader from './components/UI/preloader/Preloader';
import CharactersWrapper from './components/CharactersWrapper';
import NothingFound from './components/NothingFound';
import fetchData from './services/fetchData';
import { ICharacter } from './types/types';

import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const getDate = (query?: string) => {
    setIsLoaded(true);

    const currentQuery =
      query ||
      localStorage.getItem('Veronika2811-react-2023__searchRequest') ||
      '';

    fetchData(currentQuery).then(
      (result) => {
        setCharacters(result.results || []);
        setIsLoaded(false);
      },
      (error) => {
        console.error(error);
        setIsLoaded(true);
      }
    );
  };

  useEffect(() => {
    getDate();
  }, [searchQuery]);

  console.log(characters);

  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      {isLoaded && <Preloader />}
      {!isLoaded && characters.length ? (
        <CharactersWrapper characters={characters} />
      ) : (
        <NothingFound />
      )}
    </>
  );
};

export default App;
