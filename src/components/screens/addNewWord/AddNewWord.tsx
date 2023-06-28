import MainInput from '@/components/ui/input/mainInput';
import styles from './addNewWord.module.scss';
import MainTextArea from '@/components/ui/input/maintextarea';
import MainSelect from '@/components/ui/input/mainselect';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { partSpech } from './constants';
import MainButton from '@/components/ui/buttons/mainButton/MainButton';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useId, useState } from 'react';
import { getAllTags } from '@/store/wordsSlice';
import { ITags } from '@/interfaces/api.interface';
import Teg from '@/components/ui/teg';

type Inputs = {
	id: number | string;
	word: string;
	description: string;
	speech: string;
	example: string;
	teg: ITags[] | '';
};

const AddNewWord = () => {
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors }
	} = useForm<Inputs>();
	const [selectedTags, SetSelectedTag] = useState<ITags[]>([]);
	const dispatch = useAppDispatch();
	const tags = useAppSelector((state) => state.words.tags);

	const selectTag = (tag: ITags) => {
		if (selectedTags.includes(tag)) {
			const newArr = selectedTags.filter((el) => el.id !== tag.id);
			SetSelectedTag(newArr);
		} else {
			console.log('no');

			SetSelectedTag([...selectedTags, tag]);
		}
	};

	useEffect(() => {
		if (tags.length < 1) {
			dispatch(getAllTags());
		}
	}, [dispatch, tags.length]);

	const id = useId();

	const OnSubmit: SubmitHandler<Inputs> = (data) => {
		data.teg = selectedTags;
		data.id = id;
		console.log(data);
		reset();
		SetSelectedTag([]);
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
											placeholder='Введие слово'
											name={field.name}
											onChange={field.onChange}
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
										/>
									)}
								/>
							</label>
							<label className={styles.form_label} htmlFor='teg'>
								<span>Теги</span>
								<span className={styles.error}>{errors.teg?.message}</span>
								{/* <Controller
									name='teg'
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
											placeholder='Введие теги через запятую'
											name={field.name}
											onChange={field.onChange}
										/>
									)}
								/> */}
								<div className={styles.form_tags}>
									{tags.map((el) => (
										<Teg
											onClick={() => selectTag(el)}
											type={selectedTags.includes(el) ? 'pink' : 'blue'}
											key={el.id}
										>
											{el.name}
										</Teg>
									))}
								</div>
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
