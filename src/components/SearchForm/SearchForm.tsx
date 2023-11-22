import { FormEvent, useRef } from 'react';
import { useRouter } from 'next/router';

import Button from '../UI/button/Button';

import classes from './SearchForm.module.css';

const SearchForm = () => {
  const router = useRouter();
  const { name, perPage } = router.query;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      const currentValue = inputRef.current.value.trim();

      router.push({
        pathname: '/',
        query: {
          ...(currentValue ? { name: currentValue } : {}),
          page: 1,
          perPage: perPage || 20,
        },
      });
    }
  };

  return (
    <form className={classes.input} onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        defaultValue={name}
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
