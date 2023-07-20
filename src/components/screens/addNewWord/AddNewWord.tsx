import MainInput from '@/components/ui/input/mainInput';
import styles from './addNewWord.module.scss';
import MainTextArea from '@/components/ui/input/maintextarea';
import MainSelect from '@/components/ui/input/mainselect';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { partSpech } from './constants';
import MainButton from '@/components/ui/buttons/mainButton/MainButton';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';
import {
	addNewWord,
	closeModalThx,
	getAllTags,
	searchWord
} from '@/store/wordsSlice';
import { ITags } from '@/interfaces/api.interface';
import Teg from '@/components/ui/teg';
import Loading from '@/components/ui/loading/Loading';
import uuid from 'react-uuid';
import { Inputs, PropsComponents } from './types';

const FormAddWord: React.FC<PropsComponents> = ({ dispatch }) => {
	const {
		handleSubmit,
		control,
		reset,
		setError,
		setValue,
		formState: { errors }
	} = useForm<Inputs>();

	const [selectedTags, SetSelectedTag] = useState<ITags[]>([]);
	const tags = useAppSelector((state) => state.words.tags);
	const status = useAppSelector((state) => state.words.addWordStatus);

	useEffect(() => {
		!tags.length && dispatch(getAllTags());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	const renderTags = (): JSX.Element | JSX.Element[] => {
		if (!(typeof tags === 'undefined') && tags.length) {
			return tags.map((el) => (
				<Teg
					onClick={() => selectTag(el)}
					type={selectedTags.includes(el) ? 'pink' : 'blue'}
					key={el.id}
				>
					{el.name}
				</Teg>
			));
		} else {
			return <Loading />;
		}
	};

	const tegsIcons = renderTags();

	const selectTag = (tag: ITags) => {
		selectedTags.includes(tag)
			? SetSelectedTag(selectedTags.filter((el) => el.id !== tag.id))
			: SetSelectedTag([...selectedTags, tag]);
	};

	const onReset = (): void => {
		// useForm плохо работает с кастомными textarea и select
		reset();
		SetSelectedTag([]);
		setValue('speech', '');
		setValue('description', '');
	};

	const OnSubmit: SubmitHandler<Inputs> = (data) => {
		if (selectedTags.length) {
			data.id = uuid();
			data.tags = selectedTags;
			data.word = data.word[0].toUpperCase() + data.word.slice(1).toLowerCase();
			onReset();
			dispatch(searchWord(data.word));
			dispatch(addNewWord(data));
			// dispatch(addNewWord(data))
		} else {
			setError('tags', { type: 'custom', message: 'Укажите теги' });
		}
	};
	return (
		<>
			<h2>Добавить слово</h2>
			<form
				onSubmit={handleSubmit(OnSubmit)}
				className={styles.add_word_form}
				name={styles.mainForm}
			>
				<div className={styles.from_wrp}>
					<div className={styles.from_wrp_left}>
						<label className={styles.form_label} htmlFor='word'>
							<span>Слово</span>
							<span className={styles.error}>{errors.word?.message}</span>
							<Controller
								name='word'
								control={control}
								rules={{
									required: 'Обязательно для заполнения',
									minLength: {
										value: 2,
										message: 'Минимум 2 символа'
									}
								}}
								defaultValue=''
								render={({ field }) => (
									<MainInput
										placeholder='Введие слово'
										name={field.name}
										onChange={field.onChange}
										value={field.value}
									/>
								)}
							/>
						</label>
						<label className={styles.form_label} htmlFor='description'>
							<span>Описание</span>
							<span className={styles.error}>
								{errors.description?.message}
							</span>
							<Controller
								control={control}
								name='description'
								rules={{
									required: 'Обязательно для заполнения',
									minLength: {
										value: 5,
										message: 'Минимум 5 символов'
									}
								}}
								render={({ field }) => (
									<MainTextArea
										placeholder='Описание'
										name={field.name}
										onChange={field.onChange}
										value={field.value}
									/>
								)}
							/>
						</label>
						<label className={styles.form_label} htmlFor='example'>
							<span>Пример</span>
							<span className={styles.error}>{errors.example?.message}</span>
							<Controller
								name='example'
								control={control}
								rules={{
									required: 'Обязательно',
									minLength: {
										value: 2,
										message: 'Минимум 2 символа'
									}
								}}
								defaultValue=''
								render={({ field }) => (
									<MainInput
										placeholder='Введие пример'
										name={field.name}
										onChange={field.onChange}
										value={field.value}
									/>
								)}
							/>
						</label>
					</div>
					<div className={styles.from_wrp_rigth}>
						<label className={styles.form_label} htmlFor='speech'>
							<span>Часть речи</span>
							<span className={styles.error}>{errors.speech?.message}</span>
							<Controller
								control={control}
								name='speech'
								rules={{
									required: 'Обязательно'
								}}
								render={({ field }) => (
									<MainSelect
										name={field.name}
										onChange={field.onChange}
										options={partSpech}
										value={field.value}
									/>
								)}
							/>
						</label>
						<label className={styles.form_label} htmlFor='teg'>
							<span>Теги</span>
							<span className={styles.error}>{errors.tags?.message}</span>
							<Controller
								name='tags'
								control={control}
								defaultValue={selectedTags}
								render={({ field }) => (
									<div className={styles.form_tags}>{tegsIcons}</div>
								)}
							/>
						</label>
					</div>
				</div>
				<MainButton type='submit' size='big'>
					Добавить
				</MainButton>
			</form>
		</>
	);
};

const ThxForAdded: React.FC<PropsComponents> = ({ dispatch }) => {
	return (
		<div className={styles.thxForAdded}>
			<h2>Спасибо за ваш вклад</h2>
			<span>Ваше слово добавлено!</span>
			<MainButton
				type='button'
				size='big'
				onClick={() => dispatch(closeModalThx())}
			>
				Еще слово
			</MainButton>
		</div>
	);
};

const ErrorAdded: React.FC<PropsComponents> = ({ dispatch }) => {
	return (
		<div className={styles.thxForAdded}>
			<h2>Ошибка добавления!</h2>
			<span>Кажется такое слово у нас уже есть</span>
			<MainButton
				type='button'
				size='big'
				onClick={() => dispatch(closeModalThx())}
			>
				Попробовать
			</MainButton>
		</div>
	);
};

const AddNewWord = () => {
	const dispatch = useAppDispatch();
	const wordStatus = useAppSelector((state) => state.words.addWordStatus);

	const renderContent: React.FC<string> = (status) => {
		switch (status) {
			case 'loading':
				return <Loading />;
			case 'added':
				return <ThxForAdded dispatch={dispatch} />;
			case 'error':
				return <ErrorAdded dispatch={dispatch} />;
			default:
				return <FormAddWord dispatch={dispatch} />;
		}
	};

	const content = renderContent(wordStatus);

	return (
		<section className={styles.addSection}>
			<div className='container'>{content}</div>
		</section>
	);
};

export default AddNewWord;
