import { FieldErrors, UseFormRegister } from 'react-hook-form';

import FormElement from '../FormElement/FormElement';

import classes from './/InputCustom.module.scss';
import { ICardUser } from '../../types/types';
import { IINPUT_PROPS } from '../../utils/constants/constants';

const InputCustom = ({
  inputProp,
  inputRef,
  register,
  errors,
}: {
  inputProp: IINPUT_PROPS;
  inputRef?: React.RefObject<HTMLInputElement>;
  register?: UseFormRegister<ICardUser>;
  errors?: FieldErrors<ICardUser>;
}) => {
  const { title, type, placeholder, field } = inputProp;

  return (
    <FormElement title={title}>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        className={classes.input}
        ref={inputRef}
        {...(register && { ...register(field) })}
      />
      {errors && errors[field] && (
        <span className={classes.input__error}>{errors[field]?.message}</span>
      )}
    </FormElement>
  );
};

export default InputCustom;
