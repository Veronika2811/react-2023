import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import FormElement from '../FormElement/FormElement';
import { ICardUserCommonFile } from '../../types/types';

import classes from './SwitchGender.module.scss';

const SwitchGender = ({
  inputRef,
  register,
}: {
  inputRef?: React.RefObject<HTMLInputElement>;
  register?: UseFormRegister<ICardUserCommonFile>;
}) => {
  return (
    <FormElement title="Male / Female">
      <label className={classes.switch}>
        <input
          className={classes.switch__input}
          type="checkbox"
          ref={inputRef}
          {...(register && { ...register('gender') })}
        />
        <span
          className={`${classes.switch__input_slider} ${classes.switch__input_round}`}
        ></span>
      </label>
    </FormElement>
  );
};

export default SwitchGender;
