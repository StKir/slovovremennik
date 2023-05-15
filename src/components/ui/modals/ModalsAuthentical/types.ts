import { Control, FieldErrors, RegisterOptions } from 'react-hook-form';

export type TInput = {
  email: string;
  password: string;
  nickname: string;
};

export interface IFormComponent {
  children: React.ReactNode | React.ReactElement;
  handlerClick: any;
}

export interface IConstantValesFromInput {
  title: string;
  name: keyof TInput;
  type: 'text' | 'password';
  rules?: RegisterOptions;
}

export interface IInputsComponentsForForm {
  dataForRender: Array<IConstantValesFromInput>;
  textFromBtn: 'Вход' | 'Зарегистрироваться';
  control: Control<TInput, any>;
  error: FieldErrors<TInput>;
}
