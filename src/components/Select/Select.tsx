import { ChangeEvent } from 'react';
// import { useSearchParams } from 'react-router-dom';

// import { useAppDispatch } from '@/store/hooks';
import { charactersChangePerPage } from '@/store/slice/charactersSlice';
import {
  // DEFAULT_PAGE,
  DEFAULT_VALUE_PER_PAGE,
  // PAGE_URL_PARAMETER_KEY,
} from '@/constants/constants';
import { useRouter } from 'next/router';

import classes from './Select.module.css';

const Select = () => {
  const router = useRouter()

  const { name, perPage, page } = router.query;

  // const [, setSearchParams] = useSearchParams();

  // const dispatch = useAppDispatch();

  const onChangeItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const target = e.target.value;

    router.push({
      pathname: '/',
      // query: { name: currentValue || '', page: page || 1 },
      query: { name: name || '', page: 1, perPage: +target || 20 },
      // query: currentValue? { name: currentValue} : {},
    })

    // dispatch(charactersChangePerPage(+target));

    // setSearchParams((searchParams) => {
    //   searchParams.set(PAGE_URL_PARAMETER_KEY, DEFAULT_PAGE);
    //   return searchParams;
    // });
  };

  return (
    <select
      name="count-elements"
      defaultValue={perPage}
      onChange={onChangeItemsPerPage}
      className={classes.select}
      data-testid="select"
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
