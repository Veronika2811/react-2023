import { useCallback } from 'react';

import CharacterCard from './CharacterCard';
import Pagination from './Pagination';
import { IData } from '../types/types';

interface ICharactersWrapperProps {
  data: IData;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const CharactersWrapper = ({
  data,
  currentPage,
  setCurrentPage,
}: ICharactersWrapperProps) => {
  const { info, results } = data;

  const onClickNextPage = useCallback(() => {
    setCurrentPage(() => currentPage++);
  }, [currentPage, setCurrentPage]);

  const onClickPrevPage = useCallback(() => {
    setCurrentPage(() => currentPage--);
  }, [currentPage, setCurrentPage]);

  return (
    <main className="main">
      <ul className="main__characters characters">
        {results.map((card) => (
          <CharacterCard card={card} key={card.id} />
        ))}
      </ul>
      <Pagination
        onClickNextPage={onClickNextPage}
        onClickPrevPage={onClickPrevPage}
        disable={{
          left: currentPage === 1,
          right: currentPage === info.pages,
        }}
        pages={{ current: currentPage, total: info.pages }}
      />
    </main>
  );
};

export default CharactersWrapper;
