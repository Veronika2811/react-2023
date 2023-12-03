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
  const errorMessage =
    typeof errors === 'string' ? errors : errors?.acceptCheckbox?.message;

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
      {errorMessage && (
        <span className={classesInput.input__error}>{errorMessage}</span>
      )}
    </div>
  );
};

export default CheckboxAccept;
