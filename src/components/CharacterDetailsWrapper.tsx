import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import CharacterCard from './CharacterCard';
import NothingFound from './NothingFound';
import Preloader from './UI/preloader/Preloader';
import Button from './UI/button/Button';
import fetchItemData from '../services/fetchItemData';
import { IDataResult } from '../types/types';

import './styles.css';

const CharacterDetailsWrapper = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const details = searchParams.get('details');

  const [data, setData] = useState<IDataResult | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const getDate = useCallback(() => {
    if (details) {
      setIsLoaded(true);
      fetchItemData(details).then(
        (result) => {
          const { error } = result;
          if (!error) setData(result);
          setIsLoaded(false);
        },
        (error) => {
          console.log('error');
          console.error(error);
          setIsLoaded(true);
        }
      );
    }
  }, [details]);

  useEffect(() => {
    getDate();
  }, [details, getDate]);

  return (
    <div className="main__details details">
      {isLoaded && <Preloader />}
      {!isLoaded && data ? (
        <>
          <CharacterCard card={data} />
          <Button
            type="button"
            onClick={() => {
              setSearchParams((searchParams) => {
                searchParams.delete('details');
                return searchParams;
              });
            }}
          >
            Close
          </Button>
        </>
      ) : (
        <NothingFound />
      )}
    </div>
  );
};

export default CharacterDetailsWrapper;
