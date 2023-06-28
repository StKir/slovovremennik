import MainInput from '@/components/ui/input/mainInput';
import Teg from '@/components/ui/teg';

import styles from './allWord.module.scss';
import { demoTegsList, demoWordsList } from './contstant';
import MainButton from '@/components/ui/buttons/mainButton/MainButton';
import { FormModalsAuth } from '@/components/ui/modals/ModalsAuthentical';
import Words from '@/components/ui/word';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getAllTags, getAllWords, selectAll } from '@/store/wordsSlice';

const AllWords = () => {
	const words = useAppSelector(selectAll);
	const tags = useAppSelector((state) => state.words.tags);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllWords());
		if (tags.length < 1) {
			dispatch(getAllTags());
		}
	}, [dispatch, tags.length]);

	return (
		<div className={styles.container}>
			<h2>Все слова</h2>
			<div className={styles.tegs_content}>
				<h3 className={styles.tegs_title}>Теги:</h3>
				<div className={styles.list_tegs}>
					{tags.map((el) => (
						<Teg type='blue' key={el.id}>
							{el.name}
						</Teg>
					))}
				</div>

				<div className={styles.word__content}>
					<form className={styles.form_search_word}>
						<MainInput placeholder='Поиск' typeTheme='secondary' />
						<MainButton size='small' type='button'>
							Поиск
						</MainButton>
					</form>
					<div className={styles.word_list}>
						{words.map((wordInfo) => (
							<Words content={wordInfo} key={wordInfo.word} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllWords;
