import { useRouter } from 'next/router';
import Image from 'next/image';
import { MouseEvent } from 'react';

import Button from '../UI/button/Button';
import { IDataResult } from '@/types/types';
import getStatusCharacterColor from '@/utils/getStatusCharacterColor/getStatusCharacterColor';
import { DEFAULT_QUERY_PARAMS } from '@/utils/constants/constants';

import classes from './CardDetails.module.css';
import classesCard from '../CardsWrapper/Card/Card.module.css';

const CardDetails = ({ card }: { card: IDataResult }) => {
  const router = useRouter();

  const { status, image, gender, species, location } = card;

  const closeDetails = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    const { name, page, perPage } = router.query;

    if (e.target === e.currentTarget) {
      router.push({
        query: {
          ...(name ? { name } : {}),
          page: page || DEFAULT_QUERY_PARAMS.currentPage,
          perPage: perPage || DEFAULT_QUERY_PARAMS.perPage,
        },
      });
    }
  };

  return (
    <div className={classes.modal} onClick={(e) => closeDetails(e)}>
      <div className={classes.details}>
        <>
          <li
            className={`${classesCard.card} ${classes.card__details}`}
            data-testid="card-details"
          >
            <p
              className={`${classesCard.card__label} ${
                classesCard[getStatusCharacterColor(status)]
              }`}
            >
              {status}
            </p>
            <Image src={image} alt={card.name} width={250} height={250} />
            <div className={classesCard.card__content}>
              <h2>{card.name}</h2>
              <p>{`Gender: ${gender}`}</p>
              <p>{`Species: ${species}`}</p>
              <p>{`Location: ${location.name}`}</p>
            </div>
          </li>
          <Button
            type="button"
            onClick={(e) => closeDetails(e)}
            data-testid="close-details"
          >
            Close
          </Button>
        </>
      </div>
    </div>
  );
};

export default CardDetails;
