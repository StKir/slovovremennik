interface ICheckArray {
  array: Array<any>;
  children: React.ReactElement | React.ReactNode;
}

export const CheckArray: React.FC<ICheckArray> = ({ array, children }) => {
  return <>{array.length ? <>{children}</> : <h2>Нет слов</h2>}</>;
};
