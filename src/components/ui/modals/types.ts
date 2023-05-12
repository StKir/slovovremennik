export interface IFormComponent {
  children: React.ReactNode | React.ReactElement;
}

export interface IConstantValesFromInput {
  title: string;
  name: string;
  type: 'text' | 'password';
}

export interface IInputsComponentsForForm {
  dataForRender: Array<IConstantValesFromInput>;
  textFromBtn: 'Вход' | 'Зарегистрироваться';
}
