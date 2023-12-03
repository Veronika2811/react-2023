import Card from '../Card/Card';
import { IInitialStateFormSlice } from '../../types/types';

import classes from './CardList.module.scss';

const CardList = ({ users }: IInitialStateFormSlice) => {
  return (
    <div className={classes.card_list}>
      {users.map((user, index) => (
        <Card user={user} key={index} />
      ))}
    </div>
  );
};

export default CardList;
