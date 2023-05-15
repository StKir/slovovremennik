import MainInput from '@/components/ui/input/mainInput';
import styles from './addNewWord.module.scss';
import MainTextArea from '@/components/ui/input/maintextarea';
import MainSelect from '@/components/ui/input/mainselect';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { partSpech } from './constants';
import MainButton from '@/components/ui/buttons/mainButton/MainButton';

type Inputs = {
  word: string;
  description: string;
  speech: string;
};

const AddNewWord = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <section className={styles.addSection}>
      <div className="container">
        <h2>Добавить слово</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.add_word_form}
          name={styles.mainForm}>
          <div className={styles.from_wrp}>
            <div className={styles.from_wrp_left}>
              <label className={styles.form_label} htmlFor="word">
                <span>Слово</span>
                <span className={styles.error}>{errors.word?.message}</span>
                <Controller
                  name="word"
                  control={control}
                  rules={{
                    required: 'Обязательно для заполнения',
                    minLength: {
                      value: 2,
                      message: 'Минимум 2 символа',
                    },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <MainInput
                      placeholder="Введие слово"
                      name={field.name}
                      onChange={field.onChange}
                    />
                  )}
                />
              </label>
              <label className={styles.form_label} htmlFor="description">
                <span>Описание</span>

                <span className={styles.error}>{errors.description?.message}</span>

                <Controller
                  control={control}
                  name="description"
                  rules={{
                    required: 'Обязательно для заполнения',
                    minLength: {
                      value: 5,
                      message: 'Минимум 5 символов',
                    },
                  }}
                  render={({ field }) => (
                    <MainTextArea
                      placeholder="Введие слово"
                      name={field.name}
                      onChange={field.onChange}
                    />
                  )}
                />
              </label>
            </div>
            <div className={styles.from_wrp_rigth}>
              <label className={styles.form_label} htmlFor="speech">
                <span>Часть речи</span>
                <span className={styles.error}>{errors.speech?.message}</span>
                <Controller
                  control={control}
                  name="speech"
                  rules={{
                    required: 'Обязательно',
                  }}
                  render={({ field }) => (
                    <MainSelect name={field.name} onChange={field.onChange} options={partSpech} />
                  )}
                />
              </label>
            </div>
          </div>
          <MainButton type="submit" size="big">
            Добавить
          </MainButton>
        </form>
      </div>
    </section>
  );
};

export default AddNewWord;
