import SearchForm from '../SearchForm/SearchForm';
import Select from '../Select/Select';
import ErrorButton from '../ErrorButton/ErrorButton';

import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <SearchForm />
      <Select />
      <ErrorButton />
    </header>
  );
};

export default Header;
