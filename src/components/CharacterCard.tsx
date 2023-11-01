import { IDataResult } from '../types/types';

import './styles.css';

interface ICharacterCardProps {
  card: IDataResult;
}

const CharacterCard = ({ card }: ICharacterCardProps) => {
  const { id, status, image, name, gender, species, location } = card;

  return (
    <li className="card" key={id}>
      <p
        className={`card__label ${
          status === 'Dead'
            ? 'card__label_red'
            : status === 'Alive'
            ? 'card__label_green'
            : 'card__label_grey'
        }`}
      >
        {status}
      </p>
      <img className="card__image" src={image} alt={name} />
      <div className="card__content">
        <h3>{name}</h3>
        <p>
          Gender: <span>{gender}</span>
        </p>
        <p>
          Species: <span>{species}</span>
        </p>
        <p>
          Location: <span>{location.name}</span>
        </p>
      </div>
    </li>
  );
};

export default CharacterCard;
