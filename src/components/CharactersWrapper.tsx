import { SetURLSearchParams } from 'react-router-dom';

import CharacterCard from './CharacterCard';
import { IDataResult } from '../types/types';

interface ICharactersWrapperProps {
  data: IDataResult[];
  setSearchParams: SetURLSearchParams;
}

const CharactersWrapper = ({
  data,
  setSearchParams,
}: ICharactersWrapperProps) => {
  return (
    <ul
      className="main__characters characters"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setSearchParams((searchParams) => {
            searchParams.delete('details');
            return searchParams;
          });
        }
      }}
    >
      {data.map((card) => (
        <CharacterCard card={card} key={card.id} />
      ))}
    </ul>
  );
};

export default CharactersWrapper;
