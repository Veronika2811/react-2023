import { useRouter } from 'next/router';

import Preloader from '../UI/preloader/Preloader';
import CardsWrapper from '../CardsWrapper/CardsWrapper';
import CardDetails from '../CardDetails/CardDetails';
import Pagination from '../Pagination/Pagination';
import NothingFound from '@/components/NothingFound/NothingFound';
import { useGetCharactersQuery } from '@/api/apiSlice';
import { DEFAULT_PAGE } from '@/constants/constants';

import classes from './MainWrapper.module.css';

const MainWrapper = () => {
  const router = useRouter();
  const { page, name, perPage, id } = router.query;

  const result = useGetCharactersQuery({
    query: name,
    currentPage: page,
    perPage,
  });

  const { isLoading, error, data } = result;

  const currentPage = +(page ? page : DEFAULT_PAGE);

  return (
    <main className={id ? classes.main : ''}>
      {isLoading && <Preloader />}

      {!isLoading && error ? (
        <NothingFound />
      ) : (
        data && (
          <>
            <CardsWrapper cards={data.results} currentPage={currentPage} />
            {id && <CardDetails id={id} />}
            <Pagination info={data.info} currentPage={currentPage} />
          </>
        )
      )}
    </main>
  );
};

export default MainWrapper;
