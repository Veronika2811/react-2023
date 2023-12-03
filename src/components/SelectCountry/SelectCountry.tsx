import React from 'react';
import { useSelector } from 'react-redux';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import FormElement from '../FormElement/FormElement';
import { RootState } from '../../store/store';
import { ICardUserCommonFile } from '../../types/types';

import classesInput from '../InputCustom/InputCustom.module.scss';

const SelectCountry = ({
  inputRef,
  register,
  errors,
}: {
  inputRef?: React.RefObject<HTMLInputElement>;
  register?: UseFormRegister<ICardUserCommonFile>;
  errors?: FieldErrors<ICardUserCommonFile> | string;
}) => {
  const countries = useSelector((state: RootState) => state.COUNTRIES_SLICE);

  return (
    <FormElement title="Country:">
      <>
        <input
          type="text"
          placeholder="Choose the country"
          className={classesInput.input}
          list="listCountries"
          ref={inputRef}
          {...(register && { ...register('country') })}
        />

        <datalist id="listCountries">
          {countries.map((country, index) => {
            return (
              <option key={index} value={country}>
                {country}
              </option>
            );
          })}
        </datalist>
      </>
      {errors && typeof errors === 'string' && (
        <span className={classesInput.input__error}>{errors}</span>
      )}
      {errors && typeof errors !== 'string' && errors.country && (
        <span className={classesInput.input__error}>
          {errors.country?.message}
        </span>
      )}
    </FormElement>
  );
};

export default SelectCountry;
