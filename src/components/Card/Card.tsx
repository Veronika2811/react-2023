import React from 'react';

import classes from './Card.module.scss';

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

const Card = ({ card }: { card: ICardList }) => {
  return (
    <div className={classes.card}>
      <img className={classes.card__image} src={card.image} />
      <div className={classes.card__description}>
        <p className={classes.card_field}>
          Name: <span className={classes.card_value}>{card.name}</span>
        </p>
        <p className={classes.card_field}>
          Age: <span className={classes.card_value}>{card.age}</span>
        </p>
        <p className={classes.card_field}>
          Email: <span className={classes.card_value}>{card.email}</span>
        </p>
        <p className={classes.card_field}>
          Password:{' '}
          <span className={classes.card_value}>
            {card.password} / {card.passwordConfirmation}
          </span>
        </p>
        <p className={classes.card_field}>
          Gender: <span className={classes.card_value}>{card.gender}</span>
        </p>
        <p className={classes.card_field}>
          Country: <span className={classes.card_value}>{card.country}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
