import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .test('name', 'The first letter must be capitalized', (value) => {
      return value && value[0] === value[0].toUpperCase() ? true : false;
    }),
  age: yup
    .number()
    .required()
    .positive()
    .integer()
    .typeError('Amount must be a number'),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(6, 'Минимальная длина пароля 6 символов')
    .max(10)
    .required()
    .matches(
      /(?=.*[0-9])(?=.*[!@#$%^?&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
      'Invalid password'
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Пароли не совпадают')
    .min(6, 'Минимальная длина пароля 6 символов')
    .required()
});

interface IFormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirmation: string;
  // gender: string;
  // acceptCheckbox: boolean;
  // image: string;
  // country: string;
}

const ReactHookFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: IFormInput) => {
    console.log({ data });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <h2>Lets sign you in.</h2>
      <br />

      <input type="text" placeholder="name" {...register('name')} />
      <p>{errors.name?.message}</p>
      <br />

      <input type="text" placeholder="age" {...register('age')} />
      <p>{errors.age?.message}</p>
      <br />

      <input placeholder="email" type="email" {...register('email')} />
      <p>{errors.email?.message}</p>
      <br />

      <input placeholder="password" type="password" {...register('password')} />
      <p>{errors.password?.message}</p>
      <br />

      <input
        placeholder="passwordConfirmation"
        type="password"
        {...register('passwordConfirmation')}
      />
      <p>{errors.passwordConfirmation?.message}</p>
      <br />

      <button type="submit">Sign in</button>
    </form>
  );
};

export default ReactHookFormPage;
