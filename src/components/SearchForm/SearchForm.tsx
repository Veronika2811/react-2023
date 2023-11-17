import { FormEvent, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import Button from '../UI/button/Button';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { charactersSaveSearchQuery } from '../../redux/store/charactersSlice';
import { RootState } from '../../redux/store/store';
import {
  DEFAULT_PAGE,
  LOCAL_STORAGE_KEY,
  PAGE_URL_PARAMETER_KEY,
} from '../../constants/constants';

import classes from './SearchForm.module.css';

const SearchForm = () => {
  const [, setSearchParams] = useSearchParams();

  const query = useAppSelector(
    (state: RootState) => state.CHARACTERS_SLICE.query
  );
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      const value = inputRef.current.value.trim();
      localStorage.setItem(LOCAL_STORAGE_KEY, value);

      dispatch(charactersSaveSearchQuery(value));

      setSearchParams((searchParams) => {
        searchParams.set(PAGE_URL_PARAMETER_KEY, DEFAULT_PAGE);
        return searchParams;
      });
    }
  };

  return (
    <form className={classes.input} onSubmit={handleSubmit}>
      <input
        data-testid="search-input"
        ref={inputRef}
        type="text"
        name="search"
        placeholder="Enter request"
        autoFocus
        className={classes.input__box}
        defaultValue={query}
      />
      <Button type="submit" data-testid="search-button">
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
