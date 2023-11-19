import { FunctionComponent, ButtonHTMLAttributes } from 'react';

import classes from './Button.module.css';

const Button: FunctionComponent<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button className={classes.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
