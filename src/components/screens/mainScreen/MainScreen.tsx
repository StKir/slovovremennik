import MainButton from '@/components/ui/buttons/mainButton/MainButton';
import styles from './mainScreen.module.scss';

const MainScreen = () => {
  return (
    <section className="Main_section">
      <div className="container">
        <div className={styles.main_offer}>
          <h1>Это словарь современных слов, который пишут прямо сейчас</h1>
          <span>Приглашаем тебя внести вклад! </span>
          <MainButton size="big" onClick={() => console.log('dsa')}>
            Начать
          </MainButton>
        </div>
      </div>
    </section>
  );
};

export default MainScreen;
