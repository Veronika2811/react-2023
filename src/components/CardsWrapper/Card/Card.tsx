import { useRouter } from 'next/router';
import Image from 'next/image';

import { IDataResult } from '@/types/types';
import getStatusCharacterColor from '@/utils/getStatusCharacterColor/getStatusCharacterColor';
import { DEFAULT_QUERY_PARAMS } from '@/utils/constants/constants';

import classes from './Card.module.css';

const Card = ({ card }: { card: IDataResult }) => {
  const router = useRouter();

  const { id, status, image, gender, species, name, location } = card;

  const openCardDetails = () => {
    const { name: query, page, perPage } = router.query;

    router.push({
      pathname: '/',
      query: {
        details: id,
        ...(query ? { name: query } : {}),
        page: page || DEFAULT_QUERY_PARAMS.currentPage,
        perPage: perPage || DEFAULT_QUERY_PARAMS.perPage,
      },
    });
  };

  return (
    <li className={classes.card} onClick={openCardDetails} data-testid="card">
      <p
        className={`${classes.card__label} ${
          classes[getStatusCharacterColor(status)]
        }`}
      >
        {status}
      </p>
      <Image src={image} alt={name} width={250} height={250} priority={true} />
      <div className={classes.card__content}>
        <h2>{name}</h2>
        <p>{`Gender: ${gender}`}</p>
        <p>{`Species: ${species}`}</p>
        <p>{`Location: ${location.name}`}</p>
      </div>
    </li>
  );
};

export default Card;
