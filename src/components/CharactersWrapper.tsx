import { Component } from 'react';

import CharacterCard from './CharacterCard';
import { ICharacter } from '../types/types';

interface ICardList {
  characters: ICharacter[];
}

class CharactersWrapper extends Component<ICardList> {
  constructor(props: ICardList) {
    super(props);
  }

  render() {
    return (
      <ul className="characters">
        {this.props.characters ? (
          this.props.characters.map((card) => (
            <CharacterCard card={card} key={card.id} />
          ))
        ) : (
          <h2>Ничего не найдено</h2>
        )}
      </ul>
    );
  }
}

export default CharactersWrapper;
