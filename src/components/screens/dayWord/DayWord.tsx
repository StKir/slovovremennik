/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
import Teg from '@/components/ui/teg';
import Image from 'next/image';

import Like from '@/assets/imgs/Like.svg';
import DisLike from '@/assets/imgs/DisLike.svg';

import styles from './dayWord.module.scss';
import clsx from 'clsx';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IWord } from '@/interfaces/api.interface';
import { dayWord } from './constant';

interface IDemo {
  data: IWord | undefined | null;
  loading: boolean;
}
const RenderContentDayWord: React.FC<{ data: IWord }> = ({ data }) => {
  return (
    <>
      <div>
        <div>
          <h2 className={styles.main_title}>{data.word}</h2>
          <p className={styles.main_direction}>Состоянии безумной эйфории, неописуемого кайфа</p>
        </div>
        <div className={styles.info_content}>
          <div className={styles.info_section}>
            <ul className={styles.list_info}>
              <li className={styles.item_info}>
                <h4>Часть речи</h4>
                <p>{data.speech}</p>
              </li>
              <li className={styles.item_info}>
                <h4>Теги</h4>
                <div className={styles.tegs_content}>
                  {data.tegs.map((el, index) => (
                    <Teg key={index} type={index % 2 === 0 ? 'pink' : 'blue'}>
                      {el}
                    </Teg>
                  ))}
                </div>
              </li>
            </ul>
            <h4 className={styles.info_author}>Автор: {data.author}</h4>

            <div className={styles.likes_func}>
              <div className={clsx(styles.btn_action, styles.like)}>
                <Image src={Like} alt="like" />
              </div>
              <div className={clsx(styles.btn_action, styles.dislike)}>
                <Image src={DisLike} alt="dislike" />
              </div>
              <div className={styles.disable}></div>
            </div>
          </div>

          <ul className={styles.info_use}>
            {data.example.map((el, key) => (
              <li className={styles.list_use} key={key}>
                <p className={styles.text_use}>{el}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const DemoLoadingContent: React.FC<IDemo> = ({ data, loading }) => {
  return <div>{loading && !data ? <>Загрузка...</> : <RenderContentDayWord data={data!} />}</div>;
};

const demoResponseForServer: ({ setState }: any) => void = ({ setState }) => {
  setTimeout(() => {
    setState({
      data: dayWord,
      loading: false,
    });
  }, 5000);
};

const DayWord = () => {
  //Демо использование

  const [state, setState] = useState<IDemo>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    demoResponseForServer({ setState: setState });
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.name_page}>Слово дня</h3>
      {<DemoLoadingContent data={state.data} loading={state.loading} />}
    </div>
  );
};

export default DayWord;
