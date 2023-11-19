import { useSearchParams } from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';
import Select from '../Select/Select';
import ErrorButton from '../ErrorButton/ErrorButton';
import { RootState } from '@/store/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { charactersChangeViewMode } from '@/store/slice/charactersSlice';
import { DETAILS_URL_PARAMETER_KEY } from '@/constants/constants';

import classes from './Header.module.css';

const Header = () => {
  const [, setSearchParams] = useSearchParams();

  const viewMode = useAppSelector(
    (state: RootState) => state.CHARACTERS_SLICE.viewMode
  );
  const dispatch = useAppDispatch();

  const closeDetailsPanel = () => {
    if (viewMode) {
      dispatch(charactersChangeViewMode(null));
      setSearchParams((searchParams) => {
        searchParams.delete(DETAILS_URL_PARAMETER_KEY);
        return searchParams;
      });
    }
  };

  return (
    <header className={classes.header} onClick={closeDetailsPanel}>
      <SearchForm />
      <Select />
      <ErrorButton />
    </header>
  );
};

export default Header;
