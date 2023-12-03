import { ReactNode } from 'react';

import classes from './FormElement.module.scss';

interface IFormElementProps {
  title: string;
  children: ReactNode;
}

const FormElement = ({ title, children }: IFormElementProps) => {
  return (
    <div className={classes.form__item}>
      <p className={classes.form__title}>{title}</p>
      {children}
    </div>
  );
};

export default FormElement;
