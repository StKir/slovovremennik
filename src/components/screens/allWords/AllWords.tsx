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
	useMemo,
	useState
} from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
	getAllTags,
	removeTags,
	selectTags,
	searchWordbyInput,
	setPage
} from '@/store/wordsSlice';
import { ITags } from '@/interfaces/api.interface';
import Link from 'next/link';
import { wordApi } from '@/services/WordServices';
import Loading from '@/components/ui/loading/Loading';
import { filteredWord } from '@/services/FilteredWords';
import { TSearchWordProps, TSerach, TTagsFormProps, TWordList } from './types';
import { PropsComponents } from '../addNewWord/types';

const AllWords = () => {
	const error = useAppSelector((state) => state.words.error);
	const dispatch = useAppDispatch();

	const onSearch = (e: FormEvent<HTMLFormElement>, word: string): void => {
		e.preventDefault();
		if (word.length) {
			dispatch(
				searchWordbyInput(word[0].toUpperCase() + word.slice(1).toLowerCase())
			);
		} else {
			dispatch(searchWordbyInput('')); //Обнуляем лист слов
		}
	};

	return (
		<section>
			<div className='container'>
				<h2>Все слова</h2>
				<div className={styles.tegs_content}>
					<div className={styles.word__content}>
						<h3 className={styles.tegs_title}>Теги:</h3>
						<TagsForm error={error} dispatch={dispatch} />
						<AllWordsForm onSearch={onSearch} />
						{/* <WordList dispatch={dispatch} /> */}
						<WordsListTrue dispatch={dispatch} />
					</div>
				</div>
			</div>
		</section>
	);
};

const TagsForm = ({ error, dispatch }: TTagsFormProps) => {
	const selectedTags = useAppSelector((state) => state.words.selectedTags);
	const tags = useAppSelector((state) => state.words.tags);

	useEffect(() => {
		if (tags.length < 1) {
			dispatch(getAllTags());
		}
	}, [dispatch, tags.length]);

	const OnValidateTags = (el: ITags) => {
		selectedTags.includes(el)
			? dispatch(removeTags(el))
			: dispatch(selectTags(el));
	};

	return (
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
	);
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

const WordsListTrue = ({ dispatch }: PropsComponents) => {
	const wordStatusSearch = useAppSelector((state) => state.words.searchStatus);
	const selectedTags = useAppSelector((state) => state.words.selectedTags);
	const wordSearch = useAppSelector((state) => state.words.searchWord);

	const seachDataWord = wordSearch && filteredWord(wordSearch, selectedTags);

	return (
		<>
			{wordStatusSearch !== 'start' ? (
				<SearchWordList
					wordStatusSearch={wordStatusSearch}
					seachDataWord={seachDataWord}
				/>
			) : (
				<WordList dispatch={dispatch} selectedTags={selectedTags} />
			)}
		</>
	);
};

const WordList = ({ dispatch, selectedTags }: TWordList) => {
	const page = useAppSelector((state) => state.words.page);
	const { data: words, error, isLoading } = wordApi.useGetAllWordsQuery(page);

	const getArrayPage = (total: number) => {
		const arrayPage: number[] = [];
		for (let i = 0; i <= total / 20; i++) arrayPage.push(i);
		return arrayPage;
	};

	const dataWords = words && filteredWord(words.apiResponse, selectedTags);

	const pagesPagination = useMemo(
		() => getArrayPage(words ? words.totalCount : 0),
		[words]
	);

	return (
		<>
			{isLoading && <Loading />}
			{error ? (
				<h2>
					Не удалось загрузить слова{' '}
					{'status' in error ? error.status : error.message}
				</h2>
			) : (
				<div className={styles.word_list}>
					{!dataWords?.length && <h2>Таких слов тут нет</h2>}
					{dataWords &&
						dataWords.map((wordInfo) => (
							<Link key={wordInfo.id} href={`/words/${wordInfo.id}`}>
								<Words content={wordInfo} showDetails={false} />
							</Link>
						))}
				</div>
			)}
			<div className={styles.more_btn}>
				{pagesPagination.map((i) => (
					<MainButton
						key={i}
						size={page === i + 1 ? 'big' : 'small'}
						onClick={() => dispatch(setPage(i + 1))}
					>
						{i + 1}
					</MainButton>
				))}
			</div>
		</>
	);
};

const SearchWordList = ({
	wordStatusSearch,
	seachDataWord
}: TSearchWordProps) => {
	if (wordStatusSearch === 'error' || !(seachDataWord && seachDataWord.length))
		return <h2>Такого слова у нас нет</h2>;

	if (wordStatusSearch === 'loading') return <Loading />;

	return (
		<>
			<div className={styles.word_list}>
				{seachDataWord.map((el) => (
					<Link key={el.id} href={`/words/${el.id}`}>
						<Words content={el} showDetails={false} />
					</Link>
				))}
			</div>
		</>
	);
};
export default AllWords;
