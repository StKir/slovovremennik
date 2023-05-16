/* eslint-disable react/jsx-key */
import MainInput from '../../input/mainInput';
import MainButton from '../../buttons/mainButton/MainButton';
import { valuesForAuth, valuesForReg } from './constant';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import styles from './modals.module.scss';
import { IFormComponent, IInputsComponentsForForm, TInput } from './types';
import { motion } from 'framer-motion';

const FormComponent: React.FC<IFormComponent> = ({ children, handlerClick }) => {
  return <form onSubmit={handlerClick}>{children}</form>;
};

const InputsComponentsForForm: React.FC<IInputsComponentsForForm> = ({
  dataForRender,
  textFromBtn,
  control,
  error,
}) => {
  return (
    <>
      {dataForRender.map((el) => (
        <div className={styles.input_container} key={el.title}>
          <h3 className={styles.subtitle}>{el.title}</h3>
          <Controller
            name={el.name}
            control={control}
            rules={{ ...el.rules }}
            render={({ field }) => <MainInput type={el.type} {...field} />}
          />
          <span>{error[el.name]?.message}</span>
        </div>
      ))}
      <div className={styles.btn_container}>
        <MainButton size="small" onClick={() => {}} type="submit">
          {textFromBtn}
        </MainButton>
      </div>
    </>
  );
};

export const FormModalsAuth: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TInput>();

  const onSubmit: SubmitHandler<TInput> = (data) => console.log(data);

  return (
    <motion.div
      animate={{
        opacity: 1,
      }}
      transition={{ ease: 'linear', duration: 0.6 }}
      className={styles.modal}>
      <h2 className={styles.title}>Войти</h2>
      <FormComponent handlerClick={handleSubmit(onSubmit)}>
        <InputsComponentsForForm
          dataForRender={valuesForAuth}
          textFromBtn="Вход"
          control={control}
          error={errors}
        />
      </FormComponent>
      <div className={styles.footer_modal}>
        Нет акаунта?
        <button className={styles.footer_btn} type="button">
          Зарегистрируйтесь
        </button>
      </div>
    </motion.div>
  );
};

export const FormModalsReg: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TInput>();

  const onSubmit: SubmitHandler<TInput> = (data) => console.log(data);

  return (
    <motion.div
      animate={{
        opacity: 1,
      }}
      transition={{ ease: 'linear', duration: 0.6 }}
      className={styles.modal}>
      <h2 className={styles.title}>Регистрация</h2>
      <FormComponent handlerClick={handleSubmit(onSubmit)}>
        <InputsComponentsForForm
          dataForRender={valuesForReg}
          textFromBtn="Зарегистрироваться"
          control={control}
          error={errors}
        />
      </FormComponent>
      <div className={styles.footer_modal}>
        Есть аккаунт?
        <button className={styles.footer_btn} type="button">
          Войти
        </button>
      </div>
    </motion.div>
  );
};
