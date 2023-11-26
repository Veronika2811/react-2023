import CardsWrapper from '../CardsWrapper/CardsWrapper';
import CardDetails from '../CardDetails/CardDetails';
import Pagination from '../Pagination/Pagination';
import { IData, IDataResult } from '@/types/types';

import classes from './MainWrapper.module.css';

const MainWrapper = ({
  data,
  card,
}: {
  data: IData;
  card?: IDataResult | undefined;
}) => {
  return (
    <main className={card ? classes.main : ''}>
      <CardsWrapper cards={data.results} />
      {card && <CardDetails card={card} />}
      <Pagination info={data.info} />
    </main>
  );
};

export default MainWrapper;
