import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';
import Select from '../Select/Select';
import Button from '../UI/button/Button';
import { RootState } from '../../redux/store/store';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { charactersChangeViewMode } from '../../redux/store/charactersSlice';
import { DETAILS_URL_PARAMETER_KEY } from '../../constants/constants';

import classes from './Header.module.css';

const Header = () => {
  const [, setSearchParams] = useSearchParams();

  const viewMode = useAppSelector(
    (state: RootState) => state.CHARACTERS_SLICE.viewMode
  );
  const dispatch = useAppDispatch();

  const [hasError, setHasError] = useState<boolean>(false);

  if (hasError) {
    throw new Error('Oops! Something went wrong!');
  }

  const getErrorOnPage = () => setHasError(true);

  return (
    <header
      className={classes.header}
      onClick={() => {
        if (viewMode) {
          dispatch(charactersChangeViewMode(''));
        }

        setSearchParams((searchParams) => {
          searchParams.delete(DETAILS_URL_PARAMETER_KEY);
          return searchParams;
        });
      }}
    >
      <SearchForm />
      <Select />
      <Button type="button" onClick={getErrorOnPage} data-testid="error-button">
        Error
      </Button>
    </header>
  );
};

export default Header;
