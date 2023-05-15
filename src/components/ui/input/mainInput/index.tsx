import { IMainInput } from '@/interfaces/ui.interface';
import styles from './mainInput.module.scss';

const MainInput: React.FC<IMainInput> = ({ ...props }) => {
	return <input className={styles.input} {...props} />;
};

export default MainInput;
