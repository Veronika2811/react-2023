interface ICardUserCommon {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirmation: string;
  gender: string;
  acceptCheckbox: boolean;
  country: string;
}

export interface ICardUserCommonFile extends ICardUserCommon {
  image: FileList;
}

export interface IDataFormSlice extends ICardUserCommon {
  image: string;
}

export interface IInitialStateFormSlice {
  users: IDataFormSlice[];
}
