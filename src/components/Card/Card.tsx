// import { useSearchParams } from 'react-router-dom';

import getStatusCharacterColor from '@/utils/getStatusCharacterColor/getStatusCharacterColor';
import { useAppDispatch } from '@/store/hooks';
import { charactersChangeViewMode } from '@/store/slice/charactersSlice';
import { IDataResult } from '@/types/types';
// import { DETAILS_URL_PARAMETER_KEY } from '@/constants/constants';

import classes from './Card.module.css';
import Link from 'next/link';

interface ICharacterCardProps {
  card: IDataResult;
}

const Card = ({ card }: ICharacterCardProps) => {
  // const [, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const { id, status, image, name, gender, species, location } = card;

  const openDetailsPanel = () => {
    const cardId = id.toString();
    // setSearchParams((searchParams) => {
    //   searchParams.set(DETAILS_URL_PARAMETER_KEY, cardId);
    //   return searchParams;
    // });
    dispatch(charactersChangeViewMode(cardId));
  };

  return (
    <Link href={`details/${id}`} >
    <li className={classes.card} onClick={openDetailsPanel} data-testid="card">
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
