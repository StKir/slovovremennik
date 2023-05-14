import clsx from 'clsx';
import styles from './tegButton.module.scss';

interface ITeg {
	children: React.ReactElement | React.ReactNode;
	type: 'blue' | 'pink';
}

const Teg: React.FC<ITeg> = ({ children, type }) => {
	return <div className={clsx(styles.teg, styles[type])}>{children}</div>;
};

export default Teg;
