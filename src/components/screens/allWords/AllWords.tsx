import MainInput from '@/components/ui/input/mainInput';
import Teg from '@/components/ui/teg';

import styles from './allWord.module.scss';
import MainButton from '@/components/ui/buttons/mainButton/MainButton';
import Words from '@/components/ui/word';
import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useEffect,
	useState
} from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
	addPage,
	filteredWords,
	getAllTags,
	getAllWords,
	removeTags,
	selectTags,
	searchWordbyInput,
	setPage
} from '@/store/wordsSlice';
import { ITags } from '@/interfaces/api.interface';
import Link from 'next/link';

const AllWords = () => {
	const words = useAppSelector(filteredWords);
	const tags = useAppSelector((state) => state.words.tags);
	const page = useAppSelector((state) => state.words.page);
	const selectedTags = useAppSelector((state) => state.words.selectedTags);
	const wordStatus = useAppSelector((state) => state.words.LoadingStatus);
	const wordStatusSearch = useAppSelector((state) => state.words.searchStatus);
	const error = useAppSelector((state) => state.words.error);
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

	const onSearch = (e: FormEvent<HTMLFormElement>, word: string) => {
		e.preventDefault();
		if (word.length) {
			dispatch(
				searchWordbyInput(word[0].toUpperCase() + word.slice(1).toLowerCase())
			);
		} else {
			dispatch(searchWordbyInput(''));
			dispatch(getAllWords(18));
			dispatch(setPage(18));
		}
	};

	return (
		<section>
			<div className='container'>
				<h2>Все слова</h2>
				<div className={styles.tegs_content}>
					<h3 className={styles.tegs_title}>Теги:</h3>
					<div className={styles.list_tegs}>
						{error.tags ? (
							<h2>Не удалось загрузить теги - {error.tags}</h2>
						) : (
							tags.map((el) => (
								<Teg
									type={selectedTags.includes(el) ? 'pink' : 'blue'}
									key={el.id}
									onClick={() => OnValidateTags(el)}
								>
									{el.name}
								</Teg>
							))
						)}
					</div>
					<div className={styles.word__content}>
						<AllWordsForm onSearch={onSearch} />
						{error.words ? (
							<h2>Не удалось загрузить слова - {error.words}</h2>
						) : (
							<div className={styles.word_list}>
								{words.map((wordInfo) => (
									<Link key={wordInfo.id} href={`/words/${wordInfo.id}`}>
										<Words content={wordInfo} showDetails={false} />
									</Link>
								))}
								{wordStatusSearch === 'error' ? (
									<h2>Такого слова нет</h2>
								) : null}
							</div>
						)}
						<div className={styles.more_btn}>
							<MainButton
								size='small'
								disabled={
									wordStatus === 'error' ||
									wordStatus === 'loading' ||
									wordStatusSearch === 'error' ||
									wordStatusSearch === 'end'
								}
								onClick={() => dispatch(addPage())}
							>
								Загрузить еще
							</MainButton>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

type TSerach = {
	onSearch: (e: FormEvent<HTMLFormElement>, word: string) => void;
};

const AllWordsForm = ({ onSearch }: TSerach) => {
	const [search, setSearch] = useState<string>('');

	const handleInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setSearch(event.target.value);
		},
		[]
	);

	return (
		<form
			className={styles.form_search_word}
			onSubmit={(e) => onSearch(e, search)}
		>
			<MainInput
				placeholder='Поиск'
				typeTheme='secondary'
				value={search}
				onChange={handleInputChange}
			/>
			<MainButton size='small' type='submit'>
				Поиск
			</MainButton>
		</form>
	);
};

export default AllWords;
