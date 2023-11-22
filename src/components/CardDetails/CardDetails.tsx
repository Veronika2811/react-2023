// import { useSearchParams } from 'react-router-dom';

import Preloader from '../UI/preloader/Preloader';
import Button from '../UI/button/Button';
import getStatusCharacterColor from '../../utils/getStatusCharacterColor/getStatusCharacterColor';
// import { useGetCharacterItemQuery } from '@/api/apiSlice';
// import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { charactersChangeViewMode } from '../../store/slice/charactersSlice';
import { RootState } from '../../store/store';
// import { DETAILS_URL_PARAMETER_KEY } from '../../constants/constants';

import classes from './CardDetails.module.css';
import classesCard from '../Card/Card.module.css';
import { IDataResult } from '@/types/types';
import { useRouter } from 'next/router';
import { useGetCharacterItemQuery } from '@/api/apiSlice';
import { skipToken } from '@reduxjs/toolkit/query';

// const CardDetails = ({ data }: {data: IDataResult} ) => {
const CardDetails = () => {
  const router = useRouter()
  const { name, query, page, perPage} = router.query;

  const result = useGetCharacterItemQuery({
    id: router.query.id || '',
  });

  const { isLoading, error, data } = result;

  // console.log(isLoading, error, data)

  return (
    <div className={classes.details}>
      {isLoading && <Preloader />}

      {!isLoading && !error && data && (
        <>
          <li className={classesCard.card} data-testid="card-details">
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
              router.push({
                pathname: '/',
                query: { name: name || '', page: page || 1, perPage: perPage || 20 },
              })
              // dispatch(charactersChangeViewMode(''));
              // setSearchParams((searchParams) => {
              //   searchParams.delete(DETAILS_URL_PARAMETER_KEY);
              //   return searchParams;
              // });
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
