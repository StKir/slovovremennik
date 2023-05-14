import MainInput from '@/components/ui/input/mainInput';
import styles from './addNewWord.module.scss';

const AddNewWord = () => {
	return (
		<section className={styles.addSection}>
			<div className='container'>
				<h2>Добавить слово</h2>
				<form className={styles.add_word_form} action=''>
					<div className={styles.form_wrp}>
						<label className={styles.form_label} htmlFor='word'>
							<span>Слово</span>
							<MainInput name='word' />
						</label>
						<label className={styles.form_label} htmlFor='description'>
							<span>Описание</span>
							<MainInput name='word' />
						</label>
					</div>
				</form>
			</div>
		</section>
	);
};

export default AddNewWord;
