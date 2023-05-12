import styles from './mainInput.module.scss';

interface IMainInput
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

const MainInput: React.FC<IMainInput> = ({ ...props }) => {
  return <input className={styles.input} {...props} />;
};

export default MainInput;
