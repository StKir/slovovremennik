import MainButton from '@/components/ui/buttons/mainButton/MainButton';
import styles from './mainScreen.module.scss';
import Link from 'next/link';

const MainScreen = () => {
	return (
		<section>
			<div className='container'>
				<div className={styles.main_offer}>
					<h1>Это словарь современных слов, который пишут прямо сейчас</h1>
					<span>Приглашаем тебя внести вклад! </span>
					<Link href={'/all-words'}>
						<MainButton size='big' onClick={() => console.log('dsa')}>
							Начать
						</MainButton>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default MainScreen;
