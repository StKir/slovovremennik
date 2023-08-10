import { FC, useState } from 'react';
import styles from './header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Logo from '@/assets/imgs/logo.png';
import { pages } from '@/components/pages';
import menuIcon from '@/assets/imgs/menuMobileIcon.svg';
import menuIconClose from '@/assets/imgs/menuMobileIconClose.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { signIn, signOut, useSession } from 'next-auth/react';

const Header: FC = () => {
	return (
		<header className={styles.header}>
			<Navigations />
		</header>
	);
};

type TPathNameProps = { pathname: string };

const Navigations = () => {
	'use client';
	const [menuMobile, setMenuMobile] = useState<boolean>(false);
	const pathname = usePathname();
	const session = useSession();

	return (
		<div className='container'>
			<nav className={styles.nav_wrapper}>
				<Link href={'/'}>
					<Image
						priority={true}
						className={styles.logo}
						src={Logo}
						alt='Logo'
					/>
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
				<div className={styles.right_side_grid}>
					{session?.data &&
						(session.data.user?.image ? (
							<Link className={styles.profile_img} href='/profile'>
								<Image
									width={40}
									height={40}
									src={session.data.user.image}
									alt={session.data.user.name || 'profile'}
								/>
							</Link>
						) : (
							<Link className={styles.profile} href='/profile'>
								P
							</Link>
						))}
					{session?.data ? (
						<Link
							href='#'
							className={styles.sign_in}
							onClick={() => signOut({ callbackUrl: '/' })}
						>
							Выйти
						</Link>
					) : (
						<Link className={styles.sign_in} onClick={() => signIn()} href='#'>
							Войти
						</Link>
					)}
				</div>
				<MobileMenu menuMobile={menuMobile} setMenuMobile={setMenuMobile} />
			</nav>
			<AnimatePresence>
				{menuMobile && <MobileMenuOverlay pathname={pathname} />}
			</AnimatePresence>
		</div>
	);
};

type TMobileMenu = {
	menuMobile: boolean;
	setMenuMobile: (value: boolean) => void;
};

const MobileMenu: FC<TMobileMenu> = ({ menuMobile, setMenuMobile }) => {
	return (
		<>
			<motion.div
				className={styles.mobile_menu}
				whileTap={{ backgroundColor: '#000', scale: 0.9 }}
				onClick={() => setMenuMobile(menuMobile ? false : true)}
			>
				<Image src={menuMobile ? menuIconClose : menuIcon} alt='menuIcon' />
			</motion.div>
		</>
	);
};

const MobileMenuOverlay: FC<TPathNameProps> = (props) => {
	return (
		<motion.div
			initial={{ height: 0, padding: 0 }}
			animate={{ height: 'auto', padding: 20 }}
			exit={{ height: 0, opacity: 0 }}
			transition={{ duration: 0.8 }}
			className={styles.mobile_navBar}
		>
			<ul className={styles.nav_links}>
				{pages.map((el) => (
					<motion.li
						key={el.id}
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.8 }}
					>
						<Link
							className={props.pathname === el.href ? styles.active_link : ''}
							href={el.href}
						>
							{el.title}
						</Link>
					</motion.li>
				))}
				<motion.button
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.7 }}
					className={styles.sign_in}
				>
					Войти
				</motion.button>
			</ul>
		</motion.div>
	);
};

export default Header;
