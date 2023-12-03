export const MAX_FILE_SIZE = 102400;

export interface IINPUT_PROPS {
  title: string;
  type: 'text' | 'number' | 'email' | 'password' | 'file';
  placeholder: string;
  field:
    | 'name'
    | 'age'
    | 'email'
    | 'password'
    | 'passwordConfirmation'
    | 'image';
}

export const INPUT_PROPS: IINPUT_PROPS[] = [
  {
    title: 'Name: ',
    type: 'text',
    placeholder: 'Enter your name',
    field: 'name',
  },
  {
    title: 'Age: ',
    type: 'number',
    placeholder: 'Enter your age',
    field: 'age',
  },
  {
    title: 'Email: ',
    type: 'email',
    placeholder: 'Enter your email',
    field: 'email',
  },
  {
    title: 'Password: ',
    type: 'password',
    placeholder: 'Enter password',
    field: 'password',
  },
  {
    title: 'Confirm the password: ',
    type: 'password',
    placeholder: 'Confirm the password',
    field: 'passwordConfirmation',
  },
  {
    title: 'Photo: ',
    type: 'file',
    placeholder: 'Upload image',
    field: 'image',
  },
];
