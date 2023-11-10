import { FormEvent, useContext, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import Button from '../UI/button/Button';
import { CharactersContext } from '../../context/context';
import {
  DEFAULT_PAGE,
  LOCAL_STORAGE_KEY,
  PAGE_URL_PARAMETER_KEY,
} from '../../constants/constants';

import classes from './SearchForm.module.css';

const SearchForm = () => {
  const [, setSearchParams] = useSearchParams();
  const { searchQuery, setSearchQuery } = useContext(CharactersContext);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      const value = inputRef.current.value.trim();
      localStorage.setItem(LOCAL_STORAGE_KEY, value);

      setSearchQuery(value);

      setSearchParams((searchParams) => {
        searchParams.set(PAGE_URL_PARAMETER_KEY, DEFAULT_PAGE);
        return searchParams;
      });
    }
  };

  return (
    <form className={classes.input} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        name="search"
        placeholder="Enter request"
        autoFocus
        className={classes.input__box}
        defaultValue={searchQuery}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchForm;
