import { Component } from 'react';

import CharacterCard from './CharacterCard';
import { ICharacter } from '../types/types';

interface ICardListProps {
  characters: ICharacter[];
}

class CharactersWrapper extends Component<ICardListProps> {
  constructor(props: ICardListProps) {
    super(props);
  }

  render() {
    return (
      <ul className="characters">
        {this.props.characters.map((card) => (
          <CharacterCard card={card} key={card.id} />
        ))}
      </ul>
    );
  }
}

export default CharactersWrapper;
