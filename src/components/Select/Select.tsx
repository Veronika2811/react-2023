import { useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '../../redux/hooks';
import { charactersChangePerPage } from '../../redux/store/charactersSlice';
import {
  DEFAULT_PAGE,
  DEFAULT_VALUE_PER_PAGE,
  PAGE_URL_PARAMETER_KEY,
} from '../../constants/constants';

import classes from './Select.module.css';

const Select = () => {
  const [, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  return (
    <select
      data-testid="select"
      className={classes.select}
      name="count-elements"
      defaultValue={DEFAULT_VALUE_PER_PAGE}
      onChange={(e) => {
        const target = e.target.value;

        dispatch(charactersChangePerPage(+target));

        setSearchParams((searchParams) => {
          searchParams.set(PAGE_URL_PARAMETER_KEY, DEFAULT_PAGE);
          return searchParams;
        });
      }}
    >
      <option value="20" data-testid="option">
        20 cards
      </option>
      <option value="10" data-testid="option">
        10 cards
      </option>
    </select>
  );
};

export default Select;
