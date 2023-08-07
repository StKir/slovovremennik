import MainInput from '@/components/ui/input/mainInput';
import Teg from '@/components/ui/teg';

import styles from './allWord.module.scss';
import MainButton from '@/components/ui/buttons/mainButton/MainButton';
import Words from '@/components/ui/word';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
	addPage,
	filteredWords,
	getAllTags,
	getAllWords,
	removeTags,
	selectTags,
	searchWordbyInput
} from '@/store/wordsSlice';
import { ITags } from '@/interfaces/api.interface';

const AllWords = () => {
	const [search, setSearch] = useState<string>('');
	const words = useAppSelector(filteredWords);
	const tags = useAppSelector((state) => state.words.tags);
	const page = useAppSelector((state) => state.words.page);
	const selectedTags = useAppSelector((state) => state.words.selectedTags);
	const wordStatus = useAppSelector((state) => state.words.LoadingStatus);
	const wordStatusSearch = useAppSelector((state) => state.words.searchStatus);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllWords(page));
		if (tags.length < 1) {
			dispatch(getAllTags());
		}
	}, [tags.length, page, dispatch]);

	const OnValidateTags = (el: ITags) => {
		selectedTags.includes(el)
			? dispatch(removeTags(el))
			: dispatch(selectTags(el));
	};

	const onSearch = (word: string) => {
		if (word.length) {
			dispatch(
				searchWordbyInput(word[0].toUpperCase() + word.slice(1).toLowerCase())
			);
		} else {
			dispatch(searchWordbyInput(''));
			dispatch(getAllWords(18));
		}
	};

	return (
		<div className={styles.container}>
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
						<MainInput
							placeholder='Поиск'
							typeTheme='secondary'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<MainButton
							size='small'
							type='button'
							onClick={() => onSearch(search)}
						>
							Поиск
						</MainButton>
					</form>
					<div className={styles.word_list}>
						{words.map((wordInfo) => (
							<Words content={wordInfo} key={wordInfo.id} />
						))}
						{wordStatusSearch === 'error' ? <h2>Такого слова нет</h2> : null}
					</div>
					<div className={styles.more_btn}>
						<MainButton
							style={wordStatusSearch !== 'start' ? { display: 'none' } : {}}
							size='small'
							disabled={wordStatus === 'error' || wordStatus === 'loading'}
							onClick={() => dispatch(addPage())}
						>
							Загрузить еще
						</MainButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllWords;
