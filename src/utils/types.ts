export interface FormDataType {
  name: string;
  age: string;
  email: string;
  gender: string;
  atc: boolean;
  password: string;
  confirmPassword: string;
  country: string;
  img: FileList | null;
}

export interface ErrorsType {
  name?: string;
  age?: string;
  email?: string;
  gender?: string;
  atc?: boolean;
  password?: string;
  confirmPassword?: string;
  country?: string;
  img?: File | string;
}
