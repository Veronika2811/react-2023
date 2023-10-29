import { Component } from 'react';

import { ICharacter } from '../types/types';

class CardList extends Component<{ items: ICharacter[] }> {
  constructor(props: { items: ICharacter[] }) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.items.map((card) => (
          <li key={card.id}>
            <p>{card.status}</p>
            <img src={card.image} alt={card.name} />
            <div>
              <h3>{card.name}</h3>
              <p>
                Gender: <span>{card.gender}</span>
              </p>
              <p>
                Species: <span>{card.species}</span>
              </p>
              <p>
                Location: <span>{card.location.name}</span>
              </p>
            </div>
          </li>
        ))}
      </div>
    );
  }
}

export default CardList;
