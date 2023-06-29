import MainInput from '@/components/ui/input/mainInput';
import styles from './addNewWord.module.scss';
import MainTextArea from '@/components/ui/input/maintextarea';
import MainSelect from '@/components/ui/input/mainselect';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { partSpech } from './constants';
import MainButton from '@/components/ui/buttons/mainButton/MainButton';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useId, useState } from 'react';
import { addNewWord, getAllTags } from '@/store/wordsSlice';
import { ITags } from '@/interfaces/api.interface';
import Teg from '@/components/ui/teg';
import Loading from '@/components/ui/loading/Loading';

type Inputs = {
	id: number | string;
	word: string;
	description: string;
	speech: string;
	example: string;
	tegs: ITags[];
};

const AddNewWord = () => {
	const {
		handleSubmit,
		control,
		reset,
		setError,
		setValue,
		formState: { errors }
	} = useForm<Inputs>();
	const [selectedTags, SetSelectedTag] = useState<ITags[]>([]);
	const dispatch = useAppDispatch();
	const tags = useAppSelector((state) => state.words.tags);

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

	const selectTag = (tag: ITags) => {
		selectedTags.includes(tag)
			? SetSelectedTag(selectedTags.filter((el) => el.id !== tag.id))
			: SetSelectedTag([...selectedTags, tag]);
	};

	const id = useId();

	const onReset = (): void => {
		// useForm плохо работает с кастомными textarea и select
		reset();
		SetSelectedTag([]);
		setValue('speech', '');
		setValue('description', '');
	};

	const OnSubmit: SubmitHandler<Inputs> = (data) => {
		if (selectedTags.length) {
			data.id = id;
			data.tegs = selectedTags;
			onReset();
			console.log(data);
			dispatch(addNewWord(data));
		} else {
			setError('tegs', { type: 'custom', message: 'Выберете хотябы 1 тег' });
		}
	};
	return (
		<section className={styles.addSection}>
			<div className='container'>
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
								<span className={styles.error}>{errors.tegs?.message}</span>
								<Controller
									name='tegs'
									control={control}
									defaultValue={selectedTags}
									render={({ field }) => (
										<div className={styles.form_tags}>{renderTags()}</div>
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
					</div>
					<MainButton type='submit' size='big'>
						Добавить
					</MainButton>
				</form>
			</div>
		</section>
	);
};

export default AddNewWord;
