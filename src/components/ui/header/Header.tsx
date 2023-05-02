import { FC } from 'react';
import styles from './header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Logo from '@/assets/imgs/logo.png';
import { pages } from '@/components/pages';

const Header: FC = () => {
	const { pathname } = useRouter();
	return (
		<header className={styles.header}>
			<div className='container'>
				<nav className={styles.nav_wrapper}>
					<Link href={'/'}>
						<Image src={Logo} alt='Logo' />
					</Link>
					<ul className={styles.nav_links}>
						{pages.map((el) => (
							<li key={el.id}>
								<Link
									className={pathname === el.href ? styles.active_link : ''}
									href={el.href}
								>
									{el.title}
								</Link>
							</li>
						))}
					</ul>
					<button className={styles.sign_in}>Войти</button>
				</nav>
			</div>
		</header>
	);
};

export default Header;
