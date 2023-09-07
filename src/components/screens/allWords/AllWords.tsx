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
	setPage,
	selectAll
} from '@/store/wordsSlice';
import { ITags } from '@/interfaces/api.interface';
import Link from 'next/link';
import { TErrors } from '@/interfaces/store.interface';
import { PropsComponents } from '../addNewWord/types';
import { wordApi } from '@/services/WordServices';
import Loading from '@/components/ui/loading/Loading';

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
			dispatch(getAllWords(1));
			dispatch(setPage(1));
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
						<WordList dispatch={dispatch} />
					</div>
				</div>
			</div>
		</section>
	);
};

type TSerach = {
	onSearch: (e: FormEvent<HTMLFormElement>, word: string) => void;
};

type TTagsFormProps = {
	error: TErrors;
} & PropsComponents;

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

const WordList = ({ dispatch }: PropsComponents) => {
	const page = useAppSelector((state) => state.words.page);
	const wordStatusSearch = useAppSelector((state) => state.words.searchStatus);
	const { data: words, error, isLoading } = wordApi.useGetAllWordsQuery(page);

	const totalWords = words ? words.totalCount : 0;

	const getArrayPage = (total: number) => {
		const arrayPage: number[] = [];
		for (let i = 0; i <= total / 20; i++) arrayPage.push(i);
		return arrayPage;
	};

	const pagesPagination = getArrayPage(totalWords);

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
					{words &&
						words.apiResponse.map((wordInfo) => (
							<Link key={wordInfo.id} href={`/words/${wordInfo.id}`}>
								<Words content={wordInfo} showDetails={false} />
							</Link>
						))}
					{wordStatusSearch === 'error' ? <h2>Такого слова нет</h2> : null}
				</div>
			)}
			<div className={styles.more_btn}>
				{pagesPagination.map((i) => (
					<MainButton
						key={i}
						size='small'
						onClick={() => dispatch(setPage(i + 1))}
					>
						{i + 1}
					</MainButton>
				))}
			</div>
		</>
	);
};
export default AllWords;
