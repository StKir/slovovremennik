import MainInput from '@/components/ui/input/mainInput';
import styles from './addNewWord.module.scss';
import MainTextArea from '@/components/ui/input/maintextarea';
import MainSelect from '@/components/ui/input/mainselect';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
	word: string;
	description: string;
	speech: string;
};

const AddNewWord = () => {
	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors }
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
	return (
		<section className={styles.addSection}>
			<div className='container'>
				<h2>Добавить слово</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={styles.add_word_form}
					name='mainForm'
				>
					<div className={styles.form_left}>
						<label className={styles.form_label} htmlFor='word'>
							<span>Слово</span>
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
									<MainInput placeholder='Введие слово' {...field} />
								)}
							/>

							<span className={styles.error}>{errors.word?.message}</span>
						</label>
						<label className={styles.form_label} htmlFor='description'>
							<span>Описание</span>
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
									<MainTextArea placeholder='Введие слово' {...field} />
								)}
							/>
							{
								<span className={styles.error}>
									{errors.description?.message}
								</span>
							}
						</label>
					</div>
					<div className={styles.form_rigth}>
						<label className={styles.form_label} htmlFor='speech'>
							<span>Часть речи</span>
							<Controller
								control={control}
								name='speech'
								rules={{
									required: 'Обязательно для заполнения',
									minLength: {
										value: 2,
										message: 'Минимум 2 символа'
									}
								}}
								render={({ field }) => (
									<MainSelect
										options={[
											{
												label: '12',
												value: '12'
											},
											{
												label: '13',
												value: '13'
											}
										]}
										{...field}
									/>
								)}
							/>
							{<span className={styles.error}>{errors.speech?.message}</span>}
						</label>
					</div>
					<input type='submit' />
				</form>
			</div>
		</section>
	);
};

export default AddNewWord;
