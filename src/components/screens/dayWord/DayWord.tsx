import Teg from '@/components/ui/teg';
import styles from './dayWord.module.scss';
import { useEffect, useState } from 'react';
import { IWord } from '@/interfaces/api.interface';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getDayWord } from '@/store/settingsSlice';
import Loading from '@/components/ui/loading/Loading';

const RenderContentDayWord: React.FC<{ data: IWord }> = ({ data }) => {
	return (
		<>
			<h2 className={styles.main_title}>{data.word}</h2>
			<p className={styles.main_direction}>{data.description}</p>
			<div className={styles.info_block}>
				<div className={styles.info_content}>
					<ul className={styles.list_info}>
						<li className={styles.item_info}>
							<h4>Часть речи</h4>
							<p>{data.speech}</p>
						</li>
						<li className={styles.item_info}>
							<h4>Теги</h4>
							<div className={styles.tegs_content}>
								{data.tags.map((el, index) => (
									<Teg key={index} type={index % 2 === 0 ? 'pink' : 'blue'}>
										{el.name}
									</Teg>
								))}
							</div>
						</li>
					</ul>
					<h4 className={styles.info_author}>Автор: {data.author}</h4>
				</div>
				<ul className={styles.info_example}>
					<li className={styles.list_example} key={data.id}>
						<p className={styles.text_example}>{data.example}</p>
					</li>
				</ul>
			</div>
		</>
	);
};

export const DayWord = () => {
	const word = useAppSelector((state) => state.settings.dayWord);
	const loading = useAppSelector((state) => state.settings.LoadingStatus);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getDayWord());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	const getPageContent = () => {
		if (loading === 'loading') {
			return <Loading />;
		}
		if (loading === 'error') {
			return <h2>Произошла ошибка</h2>;
		}
		if (word !== null) {
			return <RenderContentDayWord data={word} />;
		}
	};

	const content = getPageContent();

	return (
		<section>
			<div className='container'>
				<h3 className={styles.name_page}>Слово дня</h3>
				{content}
			</div>
		</section>
	);
};

export default RenderContentDayWord;
