import { IMainInput } from '@/interfaces/ui.interface';
import styles from './mainInput.module.scss';

const MainInput: React.FC<IMainInput> = ({ typeTheme = 'primary', ...props }) => {
  return (
    <input className={typeTheme === 'primary' ? styles.input : styles.input_secondary} {...props} />
  );
};

export default MainInput;
