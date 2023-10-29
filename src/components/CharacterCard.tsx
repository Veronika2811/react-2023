import { Component } from 'react';

import { ICharacter } from '../types/types';

import './styles.css';

interface ICharacterCardProps {
  card: ICharacter;
}

class CharacterCard extends Component<ICharacterCardProps> {
  constructor(props: ICharacterCardProps) {
    super(props);
  }

  render() {
    const { id, status, image, name, gender, species, location } =
      this.props.card;

    return (
      <li className="card" key={id}>
        <p
          className="card__label"
          style={{
            backgroundColor:
              status === 'Dead'
                ? '#EC2D01'
                : status === 'Alive'
                ? '#76c076'
                : '#808080',
          }}
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
  }
}

export default CharacterCard;
