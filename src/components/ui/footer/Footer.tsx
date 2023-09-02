import { FC } from 'react';
import styles from './footer.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/imgs/logo.png';
import { pages } from '@/components/pages';

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<div className='container'>
				<div className={styles.footer_wrp}>
					<Link href={'/'}>
						<Image src={Logo} alt='Logo' priority={true} />
					</Link>
					<span className={styles.info_autor}>
						Сервис разработан для портфолио
					</span>
					<ul className={styles.nav_links}>
						{pages.map((el) => (
							<li key={el.id}>
								<Link href={el.href}>{el.title}</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
