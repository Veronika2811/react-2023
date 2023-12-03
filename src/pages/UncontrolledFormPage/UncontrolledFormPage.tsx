import { FormEvent, useRef } from 'react';
import { INPUT_PROPS } from '../../utils/constants/constants';
import InputCustom from '../../components/InputCustom/InputCustom';
import SwitchGender from '../../components/SwitchGender/SwitchGender';
import SelectCountry from '../../components/SelectCountry/SelectCountry';
import CheckboxAccept from '../../components/CheckboxAccept/CheckboxAccept';

const UncontrolledFormPage = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationInputRef = useRef<HTMLInputElement>(null);
  const genderInputRef = useRef<HTMLInputElement>(null);
  const acceptCheckboxInputRef = useRef<HTMLInputElement>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const inputsProps = {
    name: nameInputRef,
    age: ageInputRef,
    email: emailInputRef,
    password: passwordInputRef,
    passwordConfirmation: passwordConfirmationInputRef,
    image: imageInputRef,
  };

  return (
    <>
      <h1 className="title">Uncontrolled Form Page</h1>
      <form className="form" onSubmit={onSubmit}>
        {INPUT_PROPS.map((input, index) => {
          const currentItem = input.field;

          return (
            <InputCustom
              key={index}
              inputProps={input}
              inputRef={inputsProps[currentItem]}
            />
          );
        })}

        <SwitchGender inputRef={genderInputRef} />

        <SelectCountry inputRef={countryInputRef} />

        <CheckboxAccept inputRef={acceptCheckboxInputRef} />

        <input type="submit" value="Create card" className="button" />
      </form>
    </>
  );
};

export default UncontrolledFormPage;
