import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import getStatusCharacterColor from '../../utils/getStatusCharacterColor';
import { CharactersContext } from '../../context/context';
import { IDataResult } from '../../types/types';
import { DETAILS_URL_PARAMETER_KEY } from '../../constants/constants';

import classes from './Card.module.css';

interface ICharacterCardProps {
  card: IDataResult;
}

const Card = ({ card }: ICharacterCardProps) => {
  const [, setSearchParams] = useSearchParams();
  const { setDetailedCard } = useContext(CharactersContext);

  const { id, status, image, name, gender, species, location } = card;

  return (
    <li
      className={classes.card}
      onClick={() => {
        const cardId = id.toString();
        setSearchParams((searchParams) => {
          searchParams.set(DETAILS_URL_PARAMETER_KEY, cardId);
          return searchParams;
        });
        setDetailedCard(cardId);
      }}
      data-testid="card"
    >
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
  );
};

export default Card;
