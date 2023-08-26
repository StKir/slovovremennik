import { useEffect, useState } from 'react';
import styles from './profile.module.scss';
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';
import { Session } from 'next-auth';
import Link from 'next/link';
import MainButton from '@/components/ui/buttons/mainButton/MainButton';
import { IWord } from '@/interfaces/api.interface';
import Words from '@/components/ui/word';

const Profile = () => {
	const { data } = useSession();
	const renderContent = () => {
		if (data === null || data === undefined) {
			return <ProfileError />;
		} else {
			return <ProfilePage data={data} />;
		}
	};

	const content = renderContent();

	return (
		<section>
			<div className='container'>{content}</div>;
		</section>
	);
};

type TProfileSession = {
	data: Session;
};

const ProfilePage = ({ data }: TProfileSession) => {
	const [wordsAuthor, setWordsAuthor] = useState<IWord[]>([]);
	const [error, setError] = useState<boolean>(false);
	useEffect(() => {
		axios
			.get(`http://localhost:3004/words?author=${data.user?.name}`)
			.then((data) => setWordsAuthor(data.data))
			.catch((err) => setError(true));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<h2>{data?.user?.name || data?.user?.email}</h2>
			<div className={styles.profile_info}>
				<span className={styles.profile_list_header}>Ваш вклад:</span>
				{error ? (
					<span>Произошла ошибка, невозможно загрузить добавленные слова</span>
				) : (
					<div className={styles.words_array}>
						{wordsAuthor.map((wordInfo) => (
							<Words content={wordInfo} key={wordInfo.id} showDetails={true} />
						))}
					</div>
				)}
			</div>
		</>
	);
};

const ProfileError = () => {
	return (
		<div style={{ display: 'grid', justifyItems: 'center', gap: 15 }}>
			<h2>Ой, кажется вы не зарегистрированы</h2>
			<Link href={'#'} onClick={() => signIn()}>
				<MainButton size={'big'}>Войти</MainButton>
			</Link>
		</div>
	);
};

export default Profile;
