import CharacterCard from './CharacterCard';
import { ICharacter } from '../types/types';

interface ICardListProps {
  characters: ICharacter[];
}

const CharactersWrapper = ({ characters }: ICardListProps) => {
  return (
    <ul className="characters">
      {characters.map((card) => (
        <CharacterCard card={card} key={card.id} />
      ))}
    </ul>
  );
};

export default CharactersWrapper;
