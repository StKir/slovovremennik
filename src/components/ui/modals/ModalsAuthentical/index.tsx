/* eslint-disable react/jsx-key */
import MainButton from '../buttons/mainButton/MainButton';
import MainInput from '../input/mainInput';
import { valuesForAuth, valuesForReg } from './constant';
import styles from './modals.module.scss';
import { IFormComponent, IInputsComponentsForForm } from './types';

const FormComponent: React.FC<IFormComponent> = ({ children }) => {
  return <form>{children}</form>;
};

const InputsComponentsForForm: React.FC<IInputsComponentsForForm> = ({
  dataForRender,
  textFromBtn,
}) => {
  return (
    <>
      {dataForRender.map((el) => (
        <div
          className={styles.input_container}
          key={el.title}
        >
          <h3 className={styles.subtitle}>{el.title}</h3>
          <MainInput
            name={el.name}
            type={el.type}
          />
        </div>
      ))}
      <div className={styles.btn_container}>
        <MainButton
          size="small"
          onClick={() => {}}
          type="submit"
        >
          {textFromBtn}
        </MainButton>
      </div>
    </>
  );
};

export const FormModalsAuth: React.FC = () => {
  return (
    <div className={styles.modal}>
      <h2 className={styles.title}>Войти</h2>
      <FormComponent>
        <InputsComponentsForForm
          dataForRender={valuesForAuth}
          textFromBtn="Вход"
        />
      </FormComponent>
      <div className={styles.footer_modal}>
        Нет акаунта?
        <button
          className={styles.footer_btn}
          type="button"
        >
          Зарегистрируйтесь
        </button>
      </div>
    </div>
  );
};

export const FormModalsReg: React.FC = () => {
  return (
    <div className={styles.modal}>
      <h2 className={styles.title}>Регистрация</h2>
      <FormComponent>
        <InputsComponentsForForm
          dataForRender={valuesForReg}
          textFromBtn="Зарегистрироваться"
        />
      </FormComponent>
      <div className={styles.footer_modal}>
        Есть аккаунт?
        <button
          className={styles.footer_btn}
          type="button"
        >
          Войти
        </button>
      </div>
    </div>
  );
};
