import { FC, useState } from 'react';
import styles from './header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Logo from '@/assets/imgs/logo.png';
import { pages } from '@/components/pages';
import menuIcon from '@/assets/imgs/menuMobileIcon.svg';
import menuIconClose from '@/assets/imgs/menuMobileIconClose.svg';
import { AnimatePresence, motion } from 'framer-motion';

const Header: FC = () => {
  const [menuMobile, setMenuMobile] = useState<boolean>(false);
  const { pathname } = useRouter();
  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav_wrapper}>
          <Link href={'/'}>
            <Image className={styles.logo} src={Logo} alt="Logo" />
          </Link>
          <ul className={styles.nav_links}>
            {pages.map((el) => (
              <li key={el.id}>
                <Link className={pathname === el.href ? styles.active_link : ''} href={el.href}>
                  {el.title}
                </Link>
              </li>
            ))}
          </ul>
          <button className={styles.sign_in}>Войти</button>
          <motion.div
            className={styles.mobile_menu}
            whileTap={{ backgroundColor: '#000', scale: 0.9 }}
            onClick={() => setMenuMobile(menuMobile ? false : true)}>
            <Image src={menuMobile ? menuIconClose : menuIcon} alt="menuIcon" />
          </motion.div>
        </nav>
        <AnimatePresence>{menuMobile && <MobileMenu pathname={pathname} />}</AnimatePresence>
      </div>
    </header>
  );
};

type TMobileMenuProps = { pathname: string };

const MobileMenu: FC<TMobileMenuProps> = (props) => {
  return (
    <motion.div
      initial={{ height: 0, padding: 0 }}
      animate={{ height: 'auto', padding: 20 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={styles.mobile_navBar}>
      <ul className={styles.nav_links}>
        {pages.map((el) => (
          <motion.li
            key={el.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}>
            <Link className={props.pathname === el.href ? styles.active_link : ''} href={el.href}>
              {el.title}
            </Link>
          </motion.li>
        ))}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className={styles.sign_in}>
          Войти
        </motion.button>
      </ul>
    </motion.div>
  );
};

export default Header;
