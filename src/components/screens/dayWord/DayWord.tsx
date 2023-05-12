/* eslint-disable jsx-a11y/alt-text */
import Teg from '@/components/ui/teg';
import Image from 'next/image';

import Like from '@/assets/imgs/Like.svg';
import DisLike from '@/assets/imgs/DisLike.svg';

import styles from './dayWord.module.scss';
import clsx from 'clsx';

const DayWord = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.name_page}>Слово дня</h3>
      <div>
        <h2 className={styles.main_title}>Килиманджарит</h2>
        <p className={styles.main_direction}>
          Состоянии безумной эйфории, неописуемого кайфа
        </p>
      </div>
      <div className={styles.info_content}>
        <div className={styles.info_section}>
          <ul className={styles.list_info}>
            <li className={styles.item_info}>
              <h4>Часть речи</h4>
              <p>Прилагательное</p>
            </li>
            <li className={styles.item_info}>
              <h4>Теги</h4>
              <div className={styles.tegs_content}>
                <Teg type="pink">1313</Teg>
                <Teg type="pink">Модное</Teg>
                <Teg type="pink">1313</Teg>
                <Teg type="pink">1313</Teg>
                <Teg type="pink">1313</Teg>
              </div>
            </li>
          </ul>
          <h4 className={styles.info_author}>Автор: DarkPussyEater228</h4>

          <div className={styles.likes_func}>
            <div className={clsx(styles.btn_action, styles.like)}>
              <Image
                src={Like}
                alt="like"
              />
            </div>
            <div className={clsx(styles.btn_action, styles.dislike)}>
              <Image
                src={DisLike}
                alt="dislike"
              />
            </div>
            <div className={styles.disable}></div>
          </div>
        </div>

        <ul className={styles.info_use}>
          <li className={styles.list_use}>
            <p className={styles.text_use}>
              - Брат когда вижу пейзаж родного аула меня жестко килиманджарит
            </p>
          </li>
          <li className={styles.list_use}>
            <p className={styles.text_use}>
              - Брат когда вижу пейзаж родного аула меня жестко килиманджарит
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DayWord;
