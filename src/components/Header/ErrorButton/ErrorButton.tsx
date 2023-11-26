import { useState } from 'react';

import Button from '../../UI/button/Button';

const ErrorButton = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  if (hasError) {
    throw new Error('Oops! Something went wrong!');
  }

  const getErrorOnPage = () => setHasError(true);

  return (
    <Button type="button" onClick={getErrorOnPage} data-testid="error-button">
      Error
    </Button>
  );
};

export default ErrorButton;
