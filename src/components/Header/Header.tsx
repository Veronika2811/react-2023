import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';
import Select from '../Select/Select';
import Button from '../UI/button/Button';
import { DETAILS_URL_PARAMETER_KEY } from '../../constants/constants';

import classes from './Header.module.css';

const Header = () => {
  const [, setSearchParams] = useSearchParams();
  const [hasError, setHasError] = useState<boolean>(false);

  if (hasError) {
    throw new Error('Oops! Something went wrong!');
  }

  const getErrorOnPage = () => setHasError(true);

  return (
    <header
      className={classes.header}
      onClick={() => {
        setSearchParams((searchParams) => {
          searchParams.delete(DETAILS_URL_PARAMETER_KEY);
          return searchParams;
        });
      }}
    >
      <SearchForm />
      <Select />
      <Button type="button" onClick={getErrorOnPage}>
        Error
      </Button>
    </header>
  );
};

export default Header;
