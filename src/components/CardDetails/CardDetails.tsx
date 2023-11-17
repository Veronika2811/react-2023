import { useSearchParams } from 'react-router-dom';

import Preloader from '../UI/preloader/Preloader';
import Button from '../UI/button/Button';
import getStatusCharacterColor from '../../utils/getStatusCharacterColor';
import { useGetCharacterItemQuery } from '../../redux/api/apiSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { charactersChangeViewMode } from '../../redux/store/charactersSlice';
import { RootState } from '../../redux/store/store';
import { DETAILS_URL_PARAMETER_KEY } from '../../constants/constants';

import classes from './CardDetails.module.css';
import classesCard from '../Card/Card.module.css';

const CardDetails = () => {
  const [, setSearchParams] = useSearchParams();

  const { viewMode, isLoadingDetailingPage } = useAppSelector(
    (state: RootState) => state.CHARACTERS_SLICE
  );
  const dispatch = useAppDispatch();

  const { data, isError } = useGetCharacterItemQuery({
    id: viewMode,
  });

  return (
    <div className={classes.details}>
      {isLoadingDetailingPage && <Preloader />}

      {!isLoadingDetailingPage && !isError && data && (
        <>
          <li className={classesCard.card} data-testid="card-details">
            <p
              className={`${classesCard.card__label} ${
                classesCard[getStatusCharacterColor(data.status)]
              }`}
            >
              {data.status}
            </p>
            <img
              data-testid="card-image"
              className={classesCard.card__image}
              src={data.image}
              alt={data.name}
            />
            <div className={classesCard.card__content}>
              <h2>{data.name}</h2>
              <p>{`Gender: ${data.gender}`}</p>
              <p>{`Species: ${data.species}`}</p>
              <p>{`Location: ${data.location.name}`}</p>
            </div>
          </li>
          <Button
            type="button"
            onClick={() => {
              dispatch(charactersChangeViewMode(''));
              setSearchParams((searchParams) => {
                searchParams.delete(DETAILS_URL_PARAMETER_KEY);
                return searchParams;
              });
            }}
            data-testid="close-details"
          >
            Close
          </Button>
        </>
      )}
    </div>
  );
};

export default CardDetails;
