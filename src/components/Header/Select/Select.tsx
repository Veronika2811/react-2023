import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';

import { DEFAULT_PAGE } from '@/utils/constants/constants';

import classes from './Select.module.css';

const Select = () => {
  const router = useRouter();

  const { name, perPage } = router.query;

  const onChangeItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const target = e.target.value;

    router.push({
      pathname: '/',
      query: {
        ...(name ? { name } : {}),
        page: DEFAULT_PAGE,
        perPage: target,
      },
    });
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
