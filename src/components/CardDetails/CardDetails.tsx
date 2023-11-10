import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import fetchItemData from '../../services/fetchItemData';
import Preloader from '../UI/preloader/Preloader';
import Card from '../Card/Card';
import Button from '../UI/button/Button';
import { IDataResult } from '../../types/types';
import { DETAILS_URL_PARAMETER_KEY } from '../../constants/constants';

import classes from './CardDetails.module.css';

const CardDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<IDataResult | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const detailsParams = searchParams.get(DETAILS_URL_PARAMETER_KEY);

  const getDate = useCallback(() => {
    if (detailsParams) {
      setIsLoaded(true);
      fetchItemData(detailsParams).then(
        (result) => {
          const { error } = result;
          if (!error) setData(result);
          setIsLoaded(false);
        },
        (error) => {
          console.error(error);
          setIsLoaded(true);
        }
      );
    }
  }, [detailsParams]);

  useEffect(() => {
    getDate();
  }, [getDate]);

  return (
    <div className={classes.details}>
      {isLoaded && <Preloader />}

      {!isLoaded && data && (
        <>
          <Card card={data} />
          <Button
            type="button"
            onClick={() => {
              setSearchParams((searchParams) => {
                searchParams.delete(DETAILS_URL_PARAMETER_KEY);
                return searchParams;
              });
            }}
          >
            Close
          </Button>
        </>
      )}
    </div>
  );
};

export default CardDetails;
