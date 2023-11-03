import { useState } from 'react';

import InputField from './InputField';
import Button from './UI/button/Button';

interface IHeaderProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({ setSearchQuery }: IHeaderProps) => {
  const [hasError, setHasError] = useState<boolean>(false);

  const getErrorOnPage = () => setHasError(true);

  if (hasError) {
    throw new Error('Oops! Something went wrong!');
  }

  return (
    <header className="header">
      <InputField setSearchQuery={setSearchQuery} />
      <Button type="button" onClick={getErrorOnPage}>
        Error
      </Button>
    </header>
  );
};

export default Header;
