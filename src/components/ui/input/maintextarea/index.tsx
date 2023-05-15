import { IMainTextArea } from '@/interfaces/ui.interface';
import styles from '../mainInput/mainInput.module.scss';

const MainTextArea: React.FC<IMainTextArea> = ({ ...props }) => {
	return (
		<textarea
			style={{ height: 227 }}
			className={styles.input}
			{...props}
		></textarea>
	);
};

export default MainTextArea;
