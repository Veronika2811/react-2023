import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { ICardUserCommonFile } from '../../types/types';

import classes from './CheckboxAccept.module.scss';
import classesInput from '../InputCustom/InputCustom.module.scss';

const CheckboxAccept = ({
  inputRef,
  register,
  errors,
}: {
  inputRef?: React.RefObject<HTMLInputElement>;
  register?: UseFormRegister<ICardUserCommonFile>;
  errors?: FieldErrors<ICardUserCommonFile> | string;
}) => {
  return (
    <div className={classes.confirm_wrapper}>
      <div className={classes.input_checkbox}>
        <input
          type="checkbox"
          ref={inputRef}
          {...(register && { ...register('acceptCheckbox') })}
        />
        <span className={classes.form_item_title}>Accept T&C</span>
      </div>
      {errors && typeof errors === 'string' && (
        <span className={classesInput.input__error}>{errors}</span>
      )}
      {errors && typeof errors !== 'string' && errors.acceptCheckbox && (
        <span className={classesInput.input__error}>
          {errors.acceptCheckbox?.message}
        </span>
      )}
    </div>
  );
};

export default CheckboxAccept;
