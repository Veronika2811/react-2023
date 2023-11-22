import Link from 'next/link';
import { useRouter } from 'next/router';

import getStatusCharacterColor from '@/utils/getStatusCharacterColor/getStatusCharacterColor';
import { IDataResult } from '@/types/types';

import classes from './Card.module.css';

interface ICharacterCardProps {
  card: IDataResult;
}

const Card = ({ card }: ICharacterCardProps) => {
  const router = useRouter();

  const { name: query, page, perPage } = router.query;

  const { id, status, image, gender, species, name, location } = card;

  return (
    <Link
      href={{
        pathname: `details/${id}`,
        query: {
          ...(query ? { name: query } : {}),
          page: page || 1,
          perPage: perPage || 20,
        },
      }}
    >
      <li className={classes.card} data-testid="card">
        <p
          className={`${classes.card__label} ${
            classes[getStatusCharacterColor(status)]
          }`}
        >
          {status}
        </p>
        <img
          data-testid="card-image"
          className={classes.card__image}
          src={image}
          alt={name}
        />
        <div className={classes.card__content}>
          <h2>{name}</h2>
          <p>{`Gender: ${gender}`}</p>
          <p>{`Species: ${species}`}</p>
          <p>{`Location: ${location.name}`}</p>
        </div>
      </li>
    </Link>
  );
};

export default Card;
