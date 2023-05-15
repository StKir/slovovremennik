import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';
import styles from './mainSelect.module.scss';
import { IMainSelect } from '@/interfaces/ui.interface';

const MainSelect: React.FC<IMainSelect> = (props) => {
	return (
		<select className={styles.mainSelect} {...props}>
			<option value=''>Выберете</option>
			{props.options.map((el, i) => {
				return (
					<option key={i} label={el.label} value={el.value}>
						{el.label}
					</option>
				);
			})}
		</select>
	);
};

export default MainSelect;
