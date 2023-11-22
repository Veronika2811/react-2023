import { useRouter } from 'next/router';

import Card from '../Card/Card';
import changePerPage from '@/utils/changePerPage/changePerPage';
import { IDataResult } from '@/types/types';
import { ADDITIONAL_VALUE_PER_PAGE } from '@/constants/constants';

import classes from './CardsWrapper.module.css';

interface ICardsWrapperProps {
  cards: IDataResult[];
  currentPage: number;
}

const CardsWrapper = ({ cards, currentPage }: ICardsWrapperProps) => {
  const router = useRouter();
  const { perPage } = router.query;

  const characters =
    perPage && +perPage === ADDITIONAL_VALUE_PER_PAGE
      ? changePerPage(cards, currentPage, +perPage)
      : cards;

  return (
    <ul className={`${classes.main__characters} ${classes.characters}`}>
      {characters.map((card) => (
        <Card card={card} key={card.id} />
      ))}
    </ul>
  );
};

export default CardsWrapper;
