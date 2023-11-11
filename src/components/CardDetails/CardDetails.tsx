import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import fetchItemData from '../../services/fetchItemData';
import Preloader from '../UI/preloader/Preloader';
import Button from '../UI/button/Button';
import { IDataResult } from '../../types/types';
import { DETAILS_URL_PARAMETER_KEY } from '../../constants/constants';
import getStatusCharacterColor from '../../utils/getStatusCharacterColor';

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
        <li
      className={classes.card}
      data-testid="card-details"
      onClick={() => {
        setSearchParams((searchParams) => {
          searchParams.set(DETAILS_URL_PARAMETER_KEY, data.id.toString());
          return searchParams;
        });
      }}
    >
      <p
        className={`${classes.card__label} ${
          classes[getStatusCharacterColor(status)]
        }`}
      >
        {status}
      </p>
      <img data-testid="card-image" className={classes.card__image} src={data.image} alt={data.name} />
      <div className={classes.card__content}>
        <h2>{data.name}</h2>
        <p>{`Gender: ${data.gender}`}</p>
        <p>{`Species: ${data.species}`}</p>
        <p>{`Location: ${data.location.name}`}</p>
      </div>
    </li>
          {/* <div className={classes.card} data-testid="card-details">
            rfhnjxrf
          </div> */}
          {/* <Card card={data} data-testid="card-details" /> */}
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
