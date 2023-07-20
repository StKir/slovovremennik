import MainInput from '@/components/ui/input/mainInput';
import Teg from '@/components/ui/teg';

import styles from './allWord.module.scss';
import MainButton from '@/components/ui/buttons/mainButton/MainButton';
import { FormModalsAuth } from '@/components/ui/modals/ModalsAuthentical';
import Words from '@/components/ui/word';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
	addPage,
	filteredWords,
	getAllTags,
	getAllWords,
	removeTags,
	selectTags
} from '@/store/wordsSlice';
import { ITags } from '@/interfaces/api.interface';

const AllWords = () => {
	const words = useAppSelector(filteredWords);
	const tags = useAppSelector((state) => state.words.tags);
	const page = useAppSelector((state) => state.words.page);
	const selectedTags = useAppSelector((state) => state.words.selectedTags);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllWords(page));
		if (tags.length < 1) {
			dispatch(getAllTags());
		}
	}, [dispatch, tags.length, page]);

	const handleScroll = () => {
		const bottom =
			document.body.scrollHeight < window.scrollY + window.innerHeight;
		console.log('new');
		if (bottom) {
			// setTimeout(() => {
			// 	dispatch(addPage());
			// }, 3000);
		}
	};

	const OnValidateTags = (el: ITags) => {
		selectedTags.includes(el)
			? dispatch(removeTags(el))
			: dispatch(selectTags(el));
	};

	return (
		<div className={styles.container} onScroll={() => handleScroll()}>
			<h2>Все слова</h2>
			<div className={styles.tegs_content}>
				<h3 className={styles.tegs_title}>Теги:</h3>
				<div className={styles.list_tegs}>
					{tags.map((el) => (
						<Teg
							type={selectedTags.includes(el) ? 'pink' : 'blue'}
							key={el.id}
							onClick={() => OnValidateTags(el)}
						>
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
							<Words content={wordInfo} key={wordInfo.id} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllWords;
