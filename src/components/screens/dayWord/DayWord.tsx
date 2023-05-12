import styles from './dayWord.module.scss';

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
      <div>
        <div className={styles.info_section}>
          <ul className={styles.list_info}>
            <li className={styles.item_info}>
              <h4>Часть речи</h4>
              <p>Прилагательное</p>
            </li>
            <li className={styles.item_info}>
              <h4>Теги</h4>
              <div></div>
            </li>
          </ul>
        </div>

        <ul>
          <li>
            <p>
              - Брат когда вижу пейзаж родного аула меня жестко килиманджарит
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DayWord;
