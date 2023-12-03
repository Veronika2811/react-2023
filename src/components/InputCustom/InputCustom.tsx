import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

import FormElement from '../FormElement/FormElement';
import PasswordStrengthMeter from '../PasswordStrengthMeter/PasswordStrengthMeter';
import { IINPUT_PROPS } from '../../utils/constants/constants';
import { ICardUserCommonFile } from '../../types/types';

import classes from './/InputCustom.module.scss';

const InputCustom = ({
  inputProps,
  inputRef,
  register,
  errors,
  watch,
}: {
  inputProps: IINPUT_PROPS;
  inputRef?: React.RefObject<HTMLInputElement>;
  register?: UseFormRegister<ICardUserCommonFile>;
  errors?: FieldErrors<ICardUserCommonFile>;
  watch?: UseFormWatch<ICardUserCommonFile>;
}) => {
  const { title, type, placeholder, field } = inputProps;

  const password = watch ? watch('password') : undefined;

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
      {field === 'password' && <PasswordStrengthMeter password={password} />}
      {errors && errors[field] && (
        <span className={classes.input__error}>{errors[field]?.message}</span>
      )}
    </FormElement>
  );
};

export default InputCustom;
