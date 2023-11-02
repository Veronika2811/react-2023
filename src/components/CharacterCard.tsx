import { useSearchParams } from 'react-router-dom';

import getStatusCharacterColor from '../utils/getStatusCharacterColor';
import { IDataResult } from '../types/types';

import './styles.css';

interface ICharacterCardProps {
  card: IDataResult;
}

const CharacterCard = ({ card }: ICharacterCardProps) => {
  const { id, status, image, name, gender, species, location } = card;

  const [, setSearchParams] = useSearchParams();

  return (
    <li
      className="characters__card card"
      key={id}
      onClick={() => {
        setSearchParams((searchParams) => {
          searchParams.set('details', id.toString());
          return searchParams;
        });
      }}
    >
      <p className={`card__label ${getStatusCharacterColor(status)}`}>
        {status}
      </p>
      <img className="card__image" src={image} alt={name} />
      <div className="card__content">
        <h2>{name}</h2>
        <p>{`Gender: ${gender}`}</p>
        <p>{`Species: ${species}`}</p>
        <p>{`Location: ${location.name}`}</p>
      </div>
    </li>
  );
};

export default CharacterCard;
