import { IWord } from '@/interfaces/api.interface';
import { useState } from 'react';

import styles from './word.module.scss';
import Teg from '../teg';

const ShowWordWithInformation: React.FC<{
	content: IWord;
	disableFunct: () => void;
}> = ({ content, disableFunct }) => {
	return (
		<div className={styles.word_show} onClick={disableFunct}>
			<h2 className={styles.word_title}>{content.word}</h2>
			<p className={styles.word_description}>{content.description}</p>
			<div className={styles.word_list}>
				{content.tags.map((el) => (
					<Teg type='pink' key={el.id}>
						{el.name}
					</Teg>
				))}
			</div>
			<h2 className={styles.word_author}>Автор: {content.author}</h2>
		</div>
	);
};

const Words: React.FC<{ content: IWord }> = ({ content }) => {
	const [showWordInfo, setShowWordInfo] = useState(false);

	const funcChangeShowInfo = () => {
		setShowWordInfo(!showWordInfo);
	};

	if (!showWordInfo) {
		return (
			<div className={styles.word} onClick={funcChangeShowInfo}>
				{content.word}
			</div>
		);
	}

	return (
		<ShowWordWithInformation
			content={content}
			disableFunct={funcChangeShowInfo}
		/>
	);
};

export default Words;
