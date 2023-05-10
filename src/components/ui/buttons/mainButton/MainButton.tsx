import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import styles from './mainButton.module.scss';
import { MotionProps, motion } from 'framer-motion';
import { IBtnProps } from '@/interfaces/ui.interface';

const MainButton: FC<
	IBtnProps & MotionProps & ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
	return (
		<motion.button
			whileHover={{ boxShadow: '0', scale: 0.98 }}
			whileTap={{ scale: 0.92 }}
			className={
				styles.btn +
				' ' +
				(props.size === 'big' ? styles.type_Big : styles.type_Small)
			}
			{...props}
		>
			{props.children}
		</motion.button>
	);
};

export default MainButton;
