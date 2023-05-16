import MainInput from '@/components/ui/input/mainInput';
import Teg from '@/components/ui/teg';

import styles from './allWord.module.scss';
import { demoTegsList } from './contstant';
import MainButton from '@/components/ui/buttons/mainButton/MainButton';
import { FormModalsAuth } from '@/components/ui/modals/ModalsAuthentical';

const AllWords = () => {
  return (
    <div className={styles.container}>
      <h2>Все слова</h2>
      <div className={styles.tegs_content}>
        <h3 className={styles.tegs_title}>Теги:</h3>
        <div className={styles.list_tegs}>
          {demoTegsList.map((el) => (
            <Teg type="blue" key={el}>
              {el}
            </Teg>
          ))}
        </div>
        <FormModalsAuth />
        <div className={styles.word__content}>
          <form className={styles.form_search_word}>
            <MainInput placeholder="Поиск" />
            <MainButton size="small" type="button">
              Поиск
            </MainButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AllWords;
