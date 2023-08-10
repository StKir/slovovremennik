import Teg from '@/components/ui/teg';
import Image from 'next/image';

import Like from '@/assets/imgs/Like.svg';
import styles from './dayWord.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { IWord } from '@/interfaces/api.interface';
import { dayWord } from './constant';

interface IDemo {
	data: IWord | undefined | null;
	loading: boolean;
}
const RenderContentDayWord: React.FC<{ data: IWord }> = ({ data }) => {
	const [like, setLike] = useState(false);

	const addLike = () => {
		setLike(true);
	};
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

					<div className={styles.likes_func}>
						<div className={styles.like_count}>{data.likes}</div>
						<div
							className={clsx(
								styles.btn_action,
								styles.like,
								like ? styles.active : ''
							)}
							onClick={addLike}
						>
							<Image src={Like} alt='like' />
						</div>
					</div>
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

const DemoLoadingContent: React.FC<IDemo> = ({ data, loading }) => {
	return (
		<div>
			{loading && !data ? (
				<>Загрузка...</>
			) : (
				<RenderContentDayWord data={data!} />
			)}
		</div>
	);
};

const demoResponseForServer: ({ setState }: any) => void = ({ setState }) => {
	setTimeout(() => {
		setState({
			data: dayWord,
			loading: false
		});
	}, 5000);
};

export const DayWord = () => {
	//Демо использование

	const [state, setState] = useState<IDemo>({
		data: null,
		loading: true
	});

	useEffect(() => {
		demoResponseForServer({ setState: setState });
	}, []);

	return (
		<div className='container'>
			<h3 className={styles.name_page}>Слово дня</h3>
			{<DemoLoadingContent data={state.data} loading={state.loading} />}
		</div>
	);
};

export default RenderContentDayWord;
