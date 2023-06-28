import clsx from 'clsx';
import styles from './tegButton.module.scss';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface ITeg {
	children: React.ReactElement | React.ReactNode;
	type: 'blue' | 'pink';
	onClick?: () => void;
}

interface IListTegs {
	listTegs: Array<string>;
	differentColor?: boolean;
}

const Teg: React.FC<ITeg> = (props) => {
	return (
		<div
			onClick={props.onClick}
			className={clsx(styles.teg, styles[props.type])}
		>
			{props.children}
		</div>
	);
};

// export const ListFromTegs: React.FC<IListTegs> = ({
// 	listTegs,
// 	differentColor = false
// }) => {
// 	if (differentColor) {
// 		return (
// 			<>
// 				{listTegs.map((el, index) => (
// 					<Teg key={index} type={index % 2 === 0 ? 'pink' : 'blue'}>
// 						{el}
// 					</Teg>
// 				))}
// 			</>
// 		);
// 	}

// 	return (
// 		<>
// 			{listTegs.map((el, index) => (
// 				<Teg key={index} type='blue'>
// 					{el}
// 				</Teg>
// 			))}
// 		</>
// 	);
// };

export default Teg;
