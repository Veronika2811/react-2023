import React from 'react';

import classes from './CardList.module.scss';
import Card from '../Card/Card';

interface ICardList {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirmation: string;
  gender: string;
  acceptCheckbox: boolean;
  image: string;
  country: string;
}

const CardList = ({ cardList }: { cardList: ICardList[] }) => {
  return (
    <div className={classes.card_list}>
      {cardList.map((card, index) => (
        <Card card={card} key={index} />
      ))}
    </div>
  );
};

export default CardList;
