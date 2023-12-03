import * as yup from 'yup';

import { MAX_FILE_SIZE } from './constants/constants';
import INITIAL_STATE_COUNTRIES from './constants/listCountries';

const userSchema = yup.object().shape({
  name: yup
    .string()
    .required('Required field.')
    .min(2, 'Min length is 2 letters.')
    .max(15, 'Max length is 15 letters.')
    .matches(/^[А-Яа-яA-Za-z]+$/, 'The field should contain only letters.')
    .test('name', 'The first letter must be capitalized.', (value) => {
      return value && value[0] === value[0].toUpperCase() ? true : false;
    }),
  age: yup
    .number()
    .required('Required field.')
    .positive('Age must be a positive number.')
    .integer('Age must be an integer.')
    .typeError('Age must be a number.'),
  email: yup
    .string()
    .required('Required field.')
    .email('Invalid email format.')
    .matches(
      /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
      'Invalid email format.'
    ),
  password: yup
    .string()
    .required('Required field.')
    // .min(4, 'Min length password is 4 letters.')
    .max(15, 'Max length password is 15 letters.')
    .matches(/[0-9]/, 'Password must contain at least 1 digit')
    .matches(
      /[!@#$%^?&*]/,
      'Password must contain at least 1 special character (!@#$%^?&*)'
    )
    .matches(/[a-zа-яё]/, 'Password must contain at least 1 lowercased letter')
    .matches(/[A-ZА-ЯЁ]/, 'Password must contain at least 1 uppercase letter'),
  passwordConfirmation: yup
    .string()
    .required('Required field.')
    .matches(/[0-9]/, 'Password must contain at least 1 digit')
    .matches(
      /[!@#$%^?&*]/,
      'Password must contain at least 1 special character (!@#$%^?&*)'
    )
    .matches(/[a-zа-яё]/, 'Password must contain at least 1 lowercased letter')
    .matches(/[A-ZА-ЯЁ]/, 'Password must contain at least 1 uppercase letter')
    .oneOf([yup.ref('password')], 'Password mismatch.'),
  gender: yup
    .string()
    .required('Required field.')
    .transform((currentValue) =>
      JSON.parse(currentValue) ? 'Female' : 'Male'
    ),
  acceptCheckbox: yup
    .boolean()
    .required('Required field.')
    .test('acceptCheckbox', 'You must accept T&C.', (value) => !!value),
  image: yup
    .mixed<FileList>()
    .required('Required field.')
    .test('imageAvailability', 'Upload a photo.', (file) => !!file?.length)
    .test(
      'imageType',
      'Only the following formats are accepted: .jpeg and .png.',
      (file) => {
        if (!file.length) return false;

        return ['image/jpeg', 'image/png'].includes(file[0].type);
      }
    )
    .test('imageSize', 'The file is too large.', (file) => {
      if (!file.length) return false;

      return file[0].size <= MAX_FILE_SIZE;
    }),
  country: yup
    .string()
    .required('Required field.')
    .test('country', 'Select a country from the list.', (value) => {
      if (!value) return false;
      return INITIAL_STATE_COUNTRIES.includes(value);
    }),
});

export default userSchema;
