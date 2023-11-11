import { useCallback, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import fetchItemData from '../../services/fetchItemData';
import Preloader from '../UI/preloader/Preloader';
import Button from '../UI/button/Button';
import { CharactersContext } from '../../context/context';
import { IDataResult } from '../../types/types';
import { DETAILS_URL_PARAMETER_KEY } from '../../constants/constants';
import getStatusCharacterColor from '../../utils/getStatusCharacterColor';

import classes from './CardDetails.module.css';
import classesCard from '../Card/Card.module.css';

const CardDetails = () => {
  const [, setSearchParams] = useSearchParams();
  const { detailedCard, setDetailedCard } = useContext(CharactersContext);
  const [data, setData] = useState<IDataResult | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const getDate = useCallback(() => {
    if (detailedCard) {
      setIsLoaded(true);
      fetchItemData(detailedCard).then(
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
  }, [detailedCard]);

  useEffect(() => {
    getDate();
  }, [getDate]);

  return (
    <div className={classes.details}>
      {isLoaded && <Preloader />}

      {!isLoaded && data && (
        <>
          <li
            className={classesCard.card}
            data-testid="card-details"
          >
            <p
              className={`${classesCard.card__label} ${
                classesCard[getStatusCharacterColor(data.status)]
              }`}
            >
              {data.status}
            </p>
            <img
              data-testid="card-image"
              className={classesCard.card__image}
              src={data.image}
              alt={data.name}
            />
            <div className={classesCard.card__content}>
              <h2>{data.name}</h2>
              <p>{`Gender: ${data.gender}`}</p>
              <p>{`Species: ${data.species}`}</p>
              <p>{`Location: ${data.location.name}`}</p>
            </div>
          </li>
          <Button
            type="button"
            onClick={() => {
              setDetailedCard('');
              setSearchParams((searchParams) => {
                searchParams.delete(DETAILS_URL_PARAMETER_KEY);
                return searchParams;
              });
            }}
            data-testid="close-details"
          >
            Close
          </Button>
        </>
      )}
    </div>
  );
};

export default CardDetails;
