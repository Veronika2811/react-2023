import CharacterCard from './CharacterCard';
import { IDataResult } from '../types/types';

interface ICharactersWrapperProps {
  data: IDataResult[];
}

const CharactersWrapper = ({ data }: ICharactersWrapperProps) => {
  return (
    <ul className="main__characters characters">
      {data.map((card) => (
        <CharacterCard card={card} key={card.id} />
      ))}
    </ul>
  );
};

export default CharactersWrapper;
