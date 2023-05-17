import MainInput from '@/components/ui/input/mainInput';
import Teg, { ListFromTegs } from '@/components/ui/teg';

import styles from './allWord.module.scss';
import { demoTegsList, demoWordsList } from './contstant';
import MainButton from '@/components/ui/buttons/mainButton/MainButton';

import Words from '@/components/ui/word';
import { useForm, Controller } from 'react-hook-form';
import { TInputSearch } from './types';
import { useState } from 'react';
import { IWord } from '@/interfaces/api.interface';
import { CheckArray } from '@/utils/helpers/check-array';

const AllWords = () => {
  const [demoWordDataForList, setWordData] = useState<Array<IWord>>(demoWordsList);
  const { control, handleSubmit } = useForm<TInputSearch>();

  const handlerOnClickSearchInput = handleSubmit(({ search }) =>
    setWordData(
      demoWordDataForList.filter((el) => el.word.toLowerCase().includes(search.toLowerCase())),
    ),
  );

  return (
    <div className={styles.container}>
      <h2>Все слова</h2>
      <div className={styles.tegs_content}>
        <h3 className={styles.tegs_title}>Теги:</h3>
        <div className={styles.list_tegs}>
          <ListFromTegs listTegs={demoTegsList} />
        </div>

        <div className={styles.word__content}>
          <form className={styles.form_search_word} onSubmit={handlerOnClickSearchInput}>
            <Controller
              name="search"
              control={control}
              render={({ field }) => (
                <MainInput placeholder="Поиск" typeTheme="secondary" {...field} />
              )}
            />
            <MainButton size="small" type="submit">
              Поиск
            </MainButton>
          </form>
          <div className={styles.word_list}>
            <CheckArray array={demoWordDataForList}>
              {demoWordDataForList.map((wordInfo) => (
                <Words content={wordInfo} key={wordInfo.word} />
              ))}
            </CheckArray>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllWords;
