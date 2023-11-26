import { useRouter } from 'next/router';

import Card from './Card/Card';
import { IDataResult } from '@/types/types';
import changePerPage from '@/utils/changePerPage/changePerPage';
import { ADDITIONAL_VALUE_PER_PAGE } from '@/utils/constants/constants';

import classes from './CardsWrapper.module.css';

const CardsWrapper = ({ cards }: { cards: IDataResult[] }) => {
  const router = useRouter();
  const { page, perPage } = router.query;

  const characters =
    perPage === ADDITIONAL_VALUE_PER_PAGE
      ? changePerPage(cards, page, perPage)
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
