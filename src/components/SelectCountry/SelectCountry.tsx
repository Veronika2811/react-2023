import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import FormElement from '../FormElement/FormElement';
import INITIAL_STATE_COUNTRIES from '../../utils/constants/listCountries';
import { ICardUserCommonFile } from '../../types/types';

import classesInput from '../InputCustom/InputCustom.module.scss';

const SelectCountry = ({
  inputRef,
  register,
  errors,
}: {
  inputRef?: React.RefObject<HTMLInputElement>;
  register?: UseFormRegister<ICardUserCommonFile>;
  errors?: FieldErrors<ICardUserCommonFile>;
}) => {
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
          {INITIAL_STATE_COUNTRIES.map((country, index) => {
            return (
              <option key={index} value={country}>
                {country}
              </option>
            );
          })}
        </datalist>
      </>
      {errors?.country && (
        <span className={classesInput.input__error}>
          {errors?.country?.message}
        </span>
      )}
    </FormElement>
  );
};

export default SelectCountry;
