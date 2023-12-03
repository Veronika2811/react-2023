export interface ICardUser {
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

export interface TInitialState {
  user: ICardUser[];
}
