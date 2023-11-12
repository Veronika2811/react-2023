import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import Card from '../Card/Card';
import NothingFound from '../NothingFound/NothingFound';
import changePerPage from '../../utils/changePerPage';
import { CharactersContext } from '../../context/context';
import { IDataResult } from '../../types/types';
import {
  ADDITIONAL_VALUE_PER_PAGE,
  DETAILS_URL_PARAMETER_KEY,
} from '../../constants/constants';

import classes from './CardsWrapper.module.css';

interface ICardsWrapperProps {
  cards: IDataResult[] | undefined;
  currentPage: number;
}

const CardsWrapper = ({ cards, currentPage }: ICardsWrapperProps) => {
  const [, setSearchParams] = useSearchParams();
  const { perPage } = useContext(CharactersContext);

  if (cards) {
    const characters =
      cards && perPage === ADDITIONAL_VALUE_PER_PAGE
        ? changePerPage(cards, currentPage, perPage)
        : cards;

    return (
      <ul
        className={`${classes.main__characters} ${classes.characters}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setSearchParams((searchParams) => {
              searchParams.delete(DETAILS_URL_PARAMETER_KEY);
              return searchParams;
            });
          }
        }}
      >
        {characters.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </ul>
    );
  }

  return <NothingFound />;
};

export default CardsWrapper;
