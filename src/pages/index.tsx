import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import Header from '@/components/Header/Header';
import MainWrapper from '@/components/MainWrapper/MainWrapper';
import { wrapper } from '@/api/store';
import {
  getCharacterItem,
  getCharacters,
  getRunningQueriesThunk,
} from '@/api/apiSlice';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id;
    if (typeof id === 'string') {
      store.dispatch(getCharacterItem.initiate({ id }));
    }
    store.dispatch(
      getCharacters.initiate({ query: '', currentPage: '1', perPage: '20' })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export default function Page() {
  return (
    <ErrorBoundary>
      <Header />
      <MainWrapper />
    </ErrorBoundary>
  );
}
