// import { useNavigate } from 'react-router-dom';

import Button from '@/components/UI/button/Button';

import classes from './NothingFound.module.css';

interface INothingFound {
  error?: string;
}

const NothingFound = ({ error }: INothingFound) => {
  // const navigate = useNavigate();

  // const goToTheMainPage = () => navigate('/');

  return (
    <div className={classes.error__wrapper} data-testid="nothing-found">
      <h2>Sorry, but we couldn&apos;t find anything matching your request.</h2>
      {error && (
        <Button
          type="button"
          data-testid="nothing-found-button"
          // onClick={goToTheMainPage}
        >
          Main Page
        </Button>
      )}
    </div>
  );
};

export default NothingFound;
