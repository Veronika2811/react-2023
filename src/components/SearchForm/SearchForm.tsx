import { FormEvent, useRef } from 'react';
// import { useSearchParams } from 'react-router-dom';

import Button from '../UI/button/Button';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { charactersSaveSearchQuery } from '@/store/slice/charactersSlice';
import { RootState } from '@/store/store';
import {
  // DEFAULT_PAGE,
  LOCAL_STORAGE_KEY,
  // PAGE_URL_PARAMETER_KEY,
} from '@/constants/constants';

import classes from './SearchForm.module.css';

const SearchForm = () => {
  // const [, setSearchParams] = useSearchParams();

  const query = useAppSelector(
    (state: RootState) => state.CHARACTERS_SLICE.query
  );
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      const currentValue = inputRef.current.value.trim();
      localStorage.setItem(LOCAL_STORAGE_KEY, currentValue);

      dispatch(charactersSaveSearchQuery(currentValue));

      // setSearchParams((searchParams) => {
      //   searchParams.set(PAGE_URL_PARAMETER_KEY, DEFAULT_PAGE);
      //   return searchParams;
      // });
    }
  };

  return (
    <form className={classes.input} onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        defaultValue={query}
        placeholder="Enter request"
        className={classes.input__box}
        autoFocus
        ref={inputRef}
        data-testid="search-input"
      />
      <Button type="submit" data-testid="search-button">
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
