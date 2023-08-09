import styles from './profile.module.scss';
import { useSession } from 'next-auth/react';

const Profile = () => {
	const { data } = useSession();

	return (
		<div className='container'>
			<h2>{data?.user?.name || data?.user?.email}</h2>
			<div className={styles.profile_info}></div>
		</div>
	);
};

export default Profile;
