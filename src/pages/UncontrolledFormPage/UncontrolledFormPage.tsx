import { FormEvent, useRef, useState } from 'react';
import { INPUT_PROPS } from '../../utils/constants/constants';
import InputCustom from '../../components/InputCustom/InputCustom';
import SwitchGender from '../../components/SwitchGender/SwitchGender';
import SelectCountry from '../../components/SelectCountry/SelectCountry';
import CheckboxAccept from '../../components/CheckboxAccept/CheckboxAccept';
import userSchema from '../../utils/userSchema';
import { ValidationError } from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveDataUser } from '../../store/slice/formSlice';
import getBase64 from '../../utils/getBase64';

const UncontrolledFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationInputRef = useRef<HTMLInputElement>(null);
  const genderInputRef = useRef<HTMLInputElement>(null);
  const acceptCheckboxInputRef = useRef<HTMLInputElement>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [errorsForm, setErrorsForm] = useState<Record<string, string>>({});
  const passwordProgressRef = useRef<HTMLProgressElement>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      name: nameInputRef.current?.value,
      age: ageInputRef.current?.value,
      email: emailInputRef.current?.value,
      password: passwordInputRef.current?.value,
      passwordConfirmation: passwordConfirmationInputRef.current?.value,
      gender: genderInputRef.current?.checked,
      acceptCheckbox: acceptCheckboxInputRef.current?.checked,
      country: countryInputRef.current?.value,
      image: imageInputRef.current?.files,
    };

    try {
      userSchema.validateSync(data, { abortEarly: false });

      const imageBase64 = data.image && (await getBase64(data.image[0]));

      const newData = {
        ...data,
        image: imageBase64,
      };

      dispatch(saveDataUser(newData));
      navigate('/');
    } catch (err) {
      const errors: Record<string, string> = {};
      if (err instanceof ValidationError) {
        let progressValue = 4;
        err.inner.forEach((error) => {
          const { path } = error;
          if (path) {
            errors[path] = error.message;
            if (path === 'password') {
              progressValue--;
            }
          }
        });
        if (passwordProgressRef.current)
          passwordProgressRef.current.value = progressValue;
      }

      setErrorsForm(errors);
    }
  };

  const inputsRefsProps = {
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
              inputRef={inputsRefsProps[currentItem]}
              errors={errorsForm[input.field]}
              passwordProgressRef={passwordProgressRef}
            />
          );
        })}

        <SwitchGender inputRef={genderInputRef} />

        <SelectCountry inputRef={countryInputRef} errors={errorsForm.country} />

        <CheckboxAccept
          inputRef={acceptCheckboxInputRef}
          errors={errorsForm.acceptCheckbox}
        />

        <input type="submit" value="Create card" className="button" />
      </form>
    </>
  );
};

export default UncontrolledFormPage;
