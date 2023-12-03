import { IDataFormSlice } from '../../types/types';

import classes from './Card.module.scss';

const Card = ({ user }: { user: IDataFormSlice }) => {
  const {
    image,
    name,
    age,
    email,
    password,
    passwordConfirmation,
    gender,
    country,
  } = user;

  return (
    <div className={classes.card}>
      <img className={classes.card__image} src={image} />
      <div className={classes.card__description}>
        <p className={classes.card__item}>
          Name: <span className={classes.card__value}>{name}</span>
        </p>
        <p className={classes.card__item}>
          Age: <span className={classes.card__value}>{age}</span>
        </p>
        <p className={classes.card__item}>
          Email: <span className={classes.card__value}>{email}</span>
        </p>
        <p className={classes.card__item}>
          Password:{' '}
          <span className={classes.card__value}>
            {password} / {passwordConfirmation}
          </span>
        </p>
        <p className={classes.card__item}>
          Gender: <span className={classes.card__value}>{gender}</span>
        </p>
        <p className={classes.card__item}>
          Country: <span className={classes.card__value}>{country}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
