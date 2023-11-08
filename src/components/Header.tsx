import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import InputField from './InputField';
import Button from './UI/button/Button';
import Select from './Select';

const Header = () => {
  const [, setSearchParams] = useSearchParams();

  const [hasError, setHasError] = useState<boolean>(false);

  const getErrorOnPage = () => setHasError(true);

  if (hasError) {
    throw new Error('Oops! Something went wrong!');
  }

  return (
    <header
      className="header"
      onClick={() => {
        setSearchParams((searchParams) => {
          searchParams.delete('details');
          return searchParams;
        });
      }}
    >
      <InputField />
      <Select setSearchParams={setSearchParams} />
      <Button type="button" onClick={getErrorOnPage}>
        Error
      </Button>
    </header>
  );
};

export default Header;
