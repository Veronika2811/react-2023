// import { useEffect } from 'react';
// import { Outlet, useSearchParams } from 'react-router-dom';

import Preloader from '../UI/preloader/Preloader';
import CardsWrapper from '../CardsWrapper/CardsWrapper';
import Pagination from '../Pagination/Pagination';
import NothingFound from '@/views/NothingFound/NothingFound';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { useGetCharactersQuery } from '@/api/apiSlice';
// import { DEFAULT_PAGE, PAGE_URL_PARAMETER_KEY } from '@/constants/constants';

import classes from './MainWrapper.module.css';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
import { IData } from '@/types/types';

import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { DEFAULT_PAGE } from '@/constants/constants';
import { useEffect } from 'react';
import CardDetails from '../CardDetails/CardDetails';

interface IMainWrapperProps {
  data: { data: IData; }
}

const MainWrapper = () => {
  // console.log(data)
  const router = useRouter()
  const { page, name, perPage, id } = router.query;
  console.log(router.query)

  const result = useGetCharactersQuery({
    query: name,
    currentPage: page,
    perPage,
  });

  const { isLoading, error, data } = result;

  console.log(isLoading, error, data)
  // console.log(data)
  // const router = useRouter()

  // useEffect(() => {
    // router.push('/?page=1', undefined, { shallow: true })
    // console.log(router.query)
  // }, [])
 
  // useEffect(() => {
    
  // }, [router.query.page])

  // const searchParams = useSearchParams()
  // const queryParams = searchParams.get('name');
  // const pageParams = searchParams.get('page');
  const currentPage = +(page ? page : DEFAULT_PAGE)

  // console.log(currentPage)

  // if(!pageParams) {
  //   router.push({

  //     query: pageParams? { pageParams: 1} : {},
  //     // query: queryParams? queryParams : {},
  //   })
  // }

  // const [searchParams, setSearchParams] = useSearchParams();
  // const pageParams = searchParams.get(PAGE_URL_PARAMETER_KEY);
  // const currentPage = +(pageParams ? pageParams : DEFAULT_PAGE);
  // const pageParams = useSearchParams();

  // const params = new URLSearchParams(pageParams)

  // params.set('page', '1')
  
  // const currentPage = 1;

  // const { query, perPage, viewMode, isLoadingMainPage } = useAppSelector(
  //   (state: RootState) => state.CHARACTERS_SLICE
  // );

  // const { data, isError } = useGetCharactersQuery({
  //   query,
  //   currentPage,
  //   perPage,
  // });

  // useEffect(() => {
  //   if(!pageParams) {
  //     router.push({
  
  //       query: pageParams? { page: 1} : {},
  //       // query: queryParams? queryParams : {},
  //     })
  //   }
  //   // if (!pageParams) {
  //     // params.set('page', '1')
  //     // setSearchParams((searchParams) => {
  //     //   searchParams.set(PAGE_URL_PARAMETER_KEY, DEFAULT_PAGE);
  //     //   return searchParams;
  //     // });
  //   // }
  // }, []);

  // console.log(data)

  return (
    <main className={id ? classes.main : ''}>
      {isLoading && <Preloader />}

      {!isLoading && error ? (
        <NothingFound />
      ) : (
        data && (
          <>
            <CardsWrapper cards={data.results} currentPage={currentPage} />
            {id && <CardDetails  />}
            <Pagination info={data.info} currentPage={currentPage} />
          </>
        )
      )
  }
    </main>
  );
};

export default MainWrapper;
