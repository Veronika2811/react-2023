import MainWrapper from '@/components/MainWrapper/MainWrapper';
import { wrapper } from '@/api/store';
import {
  getCharacterItem,
  getCharacters,
  getRunningQueriesThunk,
} from '@/api/apiSlice';
import { IData, IDataResult } from '@/types/types';
import { DEFAULT_QUERY_PARAMS } from '@/utils/constants/constants';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { name, page, perPage, details } = context.query;

    const card =
      typeof details === 'string'
        ? await store.dispatch(
            getCharacterItem.initiate({
              id: details,
            })
          )
        : null;

    const { data } = await store.dispatch(
      getCharacters.initiate({
        ...(typeof name === 'string' ? { query: name } : {}),
        currentPage:
          typeof page === 'string' ? page : DEFAULT_QUERY_PARAMS.currentPage,
        perPage:
          typeof perPage === 'string' ? perPage : DEFAULT_QUERY_PARAMS.perPage,
      })
    );

    if (!data || (card && !card.data)) return { notFound: true };

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return { props: { data, ...(card ? { card: card.data } : {}) } };
  }
);

export default function Page({
  data,
  card,
}: {
  data: IData;
  card?: IDataResult | undefined;
}) {
  return <MainWrapper data={data} card={card} />;
}
