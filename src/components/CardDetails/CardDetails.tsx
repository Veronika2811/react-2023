import { useRouter } from 'next/router';

import Preloader from '../UI/preloader/Preloader';
import Button from '../UI/button/Button';
import getStatusCharacterColor from '../../utils/getStatusCharacterColor/getStatusCharacterColor';
import { useGetCharacterItemQuery } from '@/api/apiSlice';

import classes from './CardDetails.module.css';
import classesCard from '../Card/Card.module.css';

const CardDetails = ({ id }: { id: string | string[] }) => {
  const router = useRouter();
  const { name, page, perPage } = router.query;

  const result = useGetCharacterItemQuery({
    id,
  });

  const { isLoading, error, data } = result;

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
                query: {
                  ...(name ? { name } : {}),
                  page: page || 1,
                  perPage: perPage || 20,
                },
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
