// return (id) => {

import { getCharacterItem, getRunningQueriesThunk, useGetCharacterItemQuery } from '@/api/apiSlice';
import { wrapper } from '@/api/store';
import CardDetails from '@/components/CardDetails/CardDetails';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import Header from '@/components/Header/Header';
import MainWrapper from '@/components/MainWrapper/MainWrapper';
import { BASE_URL } from '@/constants/constants';
import { store } from '@/store/store';
import { IData, IDataResult } from '@/types/types';
// import { useRouter } from 'next/router';
// import ErrorBoundary from 'next/dist/client/components/error-boundary';
import { Provider } from 'react-redux';
import { skipToken } from "@reduxjs/toolkit/query";
import { useRouter } from "next/dist/client/router";

// }

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     const {id} = context.query;

//     // name: '', page: '1', perPage: '20', id

//     // console.log(context.params)
//     // console.log(context.query)
//     if (typeof id === "string") {
//       store.dispatch(getCharacterItem.initiate({ id }));
//     }

//     await Promise.all(store.dispatch(getRunningQueriesThunk()));

//     return {
//       props: {},
//     };
//   }
// );

// export async function getServerSideProps(context) {
//   // const router = useContext()
//   console.log(context)
//   const {id} = (context.query)

//   // const currentPage =
//   // perPage === ADDITIONAL_VALUE_PER_PAGE && page > +DEFAULT_PAGE
//   //   ? Math.ceil(page / 2)
//   //   : page;

//   // const currentPage =
//   //         perPage === ADDITIONAL_VALUE_PER_PAGE && page > +DEFAULT_PAGE
//   //           ? Math.ceil(page / 2)
//   //           : page;

//   // console.log(name)
//   // console.log(query)
//   // console.log(context)page
//   // Fetch data from external API
//   // const res = await fetch(`${BASE_URL}/?name=${name}&page=${page}`);
//   // const data: IData = await res.json();

//   const res = await fetch(`${BASE_URL}/${id}`);
//   const data: IDataResult = await res.json();

//   // Pass data to the page via props
//   return { props: { data } };
// }


export default function Details() {
  // console.log(props)
//   const router = useRouter();
//   const { id } = router.query;

//   console.log(id)
//   console.log(typeof id === "string")

//   const result = useGetCharacterItemQuery(
//     // id,
//     typeof id === "string" ? id : skipToken,
//     {
//       // If the page is not yet generated, router.isFallback will be true
//       // initially until getStaticProps() finishes running
//       skip: router.isFallback,
//     }
//   );
//   const { isLoading, error, data } = result;

//   console.log(isLoading, error, data)

// console.log(props)
  // const router = useRouter()

  // useEffect(() => {
  //   router.push('/?page=1', undefined, { shallow: true })
  // }, [])
 
  // useEffect(() => {

  // }, [router.query.page])


  return (
      <Provider store={store}>
    <ErrorBoundary>
      <Header />
      <MainWrapper />
      {/* <CardDetails  /> */}
    </ErrorBoundary>
      </Provider>
    // <Provider store={store}>
    // </Provider>
  );
}