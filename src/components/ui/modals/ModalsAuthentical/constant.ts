import { IConstantValesFromInput } from './types';

export const valuesForAuth: Array<IConstantValesFromInput> = [
  {
    name: 'email',
    title: 'Почта',
    type: 'text',
    rules: {
      required: 'Обязательно для заполнения',
      pattern: {
        value: /^\S+@\S+$/i,
        message: 'Введите валидный email',
      },
    },
  },
  {
    name: 'password',
    title: 'Пароль',
    type: 'password',
    rules: {
      required: 'Обязательно для заполнения',
      minLength: {
        value: 8,
        message: 'Больше 8 символов',
      },
    },
  },
];

export const valuesForReg: Array<IConstantValesFromInput> = [
  {
    name: 'nickname',
    title: 'Никнейм',
    type: 'text',
    rules: {
      required: 'Обязательно для заполнения',
      minLength: {
        value: 2,
        message: 'Больше 2 символов',
      },
    },
  },
  {
    name: 'email',
    title: 'Почта',
    type: 'text',
    rules: {
      required: 'Обязательно для заполнения',
      pattern: {
        value: /^\S+@\S+$/i,
        message: 'Введите валидный email',
      },
    },
  },
  {
    name: 'password',
    title: 'Пароль',
    type: 'password',
    rules: {
      required: 'Обязательно для заполнения',
      minLength: {
        value: 8,
        message: 'Больше 8 символов',
      },
    },
  },
];
