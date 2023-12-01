import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import classes from './ReactHookFormPage.module.scss';

const MAX_FILE_SIZE = 102400; //100KB

const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antigua &amp; Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bosnia &amp; Herzegovina',
  'Botswana',
  'Brazil',
  'British Virgin Islands',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Cayman Islands',
  'Central Arfrican Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Congo',
  'Cook Islands',
  'Costa Rica',
  'Cote D Ivoire',
  'Croatia',
  'Cuba',
  'Curacao',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Falkland Islands',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Polynesia',
  'French West Indies',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macau',
  'Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauro',
  'Nepal',
  'Netherlands',
  'Netherlands Antilles',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Reunion',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Pierre &amp; Miquelon',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'St Kitts &amp; Nevis',
  'St Lucia',
  'St Vincent',
  'Sudan',
  'Suriname',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  "Timor L'Este",
  'Togo',
  'Tonga',
  'Trinidad &amp; Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks &amp; Caicos',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Virgin Islands (US)',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

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
    .required(),
  gender: yup
    .string()
    .required()
    .transform((currentValue) =>
      JSON.parse(currentValue) ? 'Female' : 'Male'
    ),
  acceptCheckbox: yup
    .boolean()
    .required('field')
    .test('acceptCheckbox', 'you need to agree', (value) => value),
  image: yup
    .mixed<FileList>()
    .required('not file')
    .test(
      'type',
      'Only the following formats are accepted: .jpeg and .png',
      (value) => {
        // console.log(value[0].type)
        return (
          value &&
          (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
        );
      }
    )
    .test('filesize', 'the file is too large', (value) => {
      return value && value[0].size <= MAX_FILE_SIZE;
    }),
  country: yup.string().required(),
});

interface IFormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirmation: string;
  gender: string;
  acceptCheckbox: boolean;
  image: FileList;
  country: string;
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

  // const getBase64 = (file: any) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   reader.onload = function () {
  //     console.log(reader);
  //     //  setFileInput(reader.result);
  //   };
  //   reader.onerror = function (error) {
  //     console.log('Error: ', error);
  //   };

  //   return reader.result;
  // };

  // const handleImageChange = (e) => {
  //   e.preventDefault();
  //   let reader = new FileReader();
  //   console.log(reader);
  //   let file = e.target.files[0];
  //   // if (file) {
  //   //   reader.onloadend = () => {
  //   //     this.setState({
  //   //       file: file,
  //   //       imagePreviewUrl: reader.result
  //   //     });
  //   //   };
  //   //   reader.readAsDataURL(file);
  //   //   this.props.setFieldValue(this.props.field.name, file);
  //   // }
  // };

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

      <div className={classes.user_form__item}>
        <p className={classes.user_form__item_title}>Male / Female</p>
        <label className={classes.switch}>
          <input
            className={classes.switch__input}
            type="checkbox"
            {...register('gender')}
          />
          <span
            className={`${classes.switch__input_slider} ${classes.switch__input_round}`}
          ></span>
        </label>
      </div>
      <br />

      <div className={classes.confirm_wrapper}>
        <div className={classes.input_checkbox}>
          <input type="checkbox" {...register('acceptCheckbox')} />
          <span className={classes.form_item_title}>
            I consent to the processing of my personal data
          </span>
        </div>
        <p>{errors.acceptCheckbox?.message}</p>
      </div>
      <br />

      <input id="image-input" type="file" {...register('image')} />
      <p>{errors.image?.message}</p>
      <br />

      <div>
        <input
          type="text"
          placeholder="country"
          list="listCountries"
          {...register('country')}
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
      </div>
      <p>{errors.country?.message}</p>
      <br />

      <button type="submit">Sign in</button>
    </form>
  );
};

export default ReactHookFormPage;
